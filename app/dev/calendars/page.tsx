"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, ChevronDown, Clock, Users } from "lucide-react";

interface BookingSlot {
  date: string;
  time: string;
  available_spots: number;
  price: number;
  booking_id?: string;
}

type Persons = Record<string, number>;

interface KlsdSlotRaw {
  start?: string;
  end?: string;
  price?: number | string;
  cost?: number | string;
  available?: number | boolean;
  spots_left?: number;
  persons_remaining?: number;
  time?: string;
  date?: string;
}

interface DaySlots {
  raw: KlsdSlotRaw[];
  mapped: BookingSlot[];
}

function usePersons(productId: number, defaultCount: number = 2) {
  const [slugOrId, setSlugOrId] = useState<string>("");
  const [persons, setPersons] = useState<Persons>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      try {
        const r = await fetch(`/api/klsd/bookings/person-types?product_id=${productId}`, { cache: 'no-store' });
        const j = r.ok ? await r.json() : [];
        const list = Array.isArray(j) ? j : Array.isArray(j?.data) ? j.data : [];
        const first = list[0]?.slug || list[0]?.id || "adult";
        const key = String(first);
        if (!cancelled) {
          setSlugOrId(key);
          setPersons({ [key]: defaultCount });
        }
      } catch (e) {
        if (!cancelled) {
          setSlugOrId("adult");
          setPersons({ adult: defaultCount });
          setError("Couldn’t load person types; using default.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [productId, defaultCount]);

  const setCount = (n: number) => {
    if (!slugOrId) return;
    setPersons({ [slugOrId]: Math.max(1, n) });
  };

  return { slugOrId, persons, setCount, loading, error };
}

function useMonthAvailability(productId: number, month: Date, persons: Persons) {
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      const first = new Date(month.getFullYear(), month.getMonth(), 1);
      const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      const days: string[] = [];
      for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d).toISOString().split('T')[0]);
      }
      const results: string[] = [];
      let idx = 0;
      const maxC = 3;
      async function worker() {
        while (idx < days.length && !cancelled) {
          const current = idx++;
          const date = days[current];
          try {
            let res = await fetchDayAvailability(productId, date, persons);
            if (res.mapped.length === 0) {
              // Retry once
              res = await fetchDayAvailability(productId, date, persons);
            }
            if (res.mapped.length > 0) results.push(date);
          } catch (e: any) {
            const msg = String(e?.message || e || "");
            if (msg.includes("availability_502") || msg.includes("availability_503")) {
              try {
                const res2 = await fetchDayAvailability(productId, date, persons);
                if (res2.mapped.length > 0) results.push(date);
              } catch {}
            }
          }
        }
      }
      const runners = Array.from({ length: Math.min(maxC, days.length) }, () => worker());
      await Promise.all(runners);
      if (!cancelled) setAvailableDates(results.sort());
      if (!cancelled) setLoading(false);
    }
    run();
    return () => { cancelled = true; };
  }, [productId, month.getFullYear(), month.getMonth(), JSON.stringify(persons)]);

  return { availableDates, loading, error };
}

async function fetchPersonTypes(productId: number): Promise<string[]> {
  try {
    const r = await fetch(`/api/klsd/bookings/person-types?product_id=${productId}`, { cache: 'no-store' });
    if (!r.ok) return [];
    const j = await r.json();
    const list = Array.isArray(j) ? j : Array.isArray(j?.data) ? j.data : [];
    return list.map((x: any) => x?.slug).filter(Boolean);
  } catch {
    return [];
  }
}

async function fetchDayAvailability(productId: number, date: string, persons: Persons): Promise<DaySlots> {
  const qs = new URLSearchParams({ product_id: String(productId), start: date, end: date });
  for (const [k, v] of Object.entries(persons)) qs.append(`persons[${k}]`, String(v));
  const url = `/api/klsd/bookings/availability?${qs.toString()}`;
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(`availability_${r.status}`);
  const data = await r.json();
  const slotsArr: KlsdSlotRaw[] = Array.isArray(data?.slots) ? data.slots : Array.isArray(data) ? data : [];
  const mapped: BookingSlot[] = slotsArr.map((s) => {
    const startISO = (s.start as string) || '';
    const dt = startISO ? new Date(startISO) : null;
    const dateStr = (dt ? dt.toISOString().split('T')[0] : (s.date as string)) || date;
    const timeStr = dt ? `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}` : (s.time as string) || '';
    const priceNum = typeof s.price === 'string' ? parseFloat(s.price) : typeof s.price === 'number' ? s.price : typeof s.cost === 'string' ? parseFloat(s.cost) : typeof s.cost === 'number' ? s.cost : 0;
    const spots = typeof s.available === 'number' ? s.available : (s.spots_left ?? s.persons_remaining ?? 0);
    return { date: dateStr, time: timeStr, available_spots: (spots as number) || 0, price: priceNum || 0 };
  });
  return { raw: slotsArr, mapped };
}

function useDaySlots(productId: number, open: boolean, date: string, persons: Persons) {
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<DaySlots>({ raw: [], mapped: [] });
  const [error, setError] = useState<string>("");
  const triedAltSlug = useRef<string | null>(null);
  const retriedOnce = useRef(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!open || !date) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetchDayAvailability(productId, date, persons);
        if (!cancelled && res.mapped.length === 0 && !triedAltSlug.current) {
          const slugs = await fetchPersonTypes(productId);
          const alt = slugs.find((s) => !(s in persons));
          if (alt) {
            triedAltSlug.current = alt;
            const res2 = await fetchDayAvailability(productId, date, { [alt]: Object.values(persons)[0] || 1 });
            if (!cancelled) setSlots(res2);
          } else if (!cancelled) {
            setSlots(res);
          }
        } else if (!cancelled) {
          setSlots(res);
        }
      } catch (e) {
        if (!cancelled) {
          setSlots({ raw: [], mapped: [] });
          setError("Couldn’t load times. Please try another date.");
          if (!retriedOnce.current) {
            retriedOnce.current = true;
            setTimeout(() => setBump((x) => x + 1), 500);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [productId, open, date, JSON.stringify(persons), bump]);

  const retry = () => setBump((x) => x + 1);
  return { loading, slots, error, retry };
}

function formatTimeLabel(time: string) {
  const [h, m] = time.split(":");
  const d = new Date();
  d.setHours(parseInt(h), parseInt(m));
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function TimesList({ slots, onPick }: { slots: BookingSlot[]; onPick: (t: string, p: number) => void }) {
  if (!slots.length) {
    return (
      <div className="text-center py-3 text-gray-500">
        <Clock className="w-5 h-5 mx-auto mb-1 opacity-60" />
        <p className="text-xs">No times available</p>
      </div>
    );
  }
  return (
    <div className="space-y-1 max-h-40 overflow-y-auto -mx-1 pr-1">
      {slots.map((slot) => (
        <button
          key={`${slot.date}-${slot.time}`}
          onClick={() => onPick(slot.time, slot.price)}
          className="w-full p-2 rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm">{formatTimeLabel(slot.time)}</div>
              <div className="text-xs text-gray-600 flex items-center gap-1">
                <Users className="w-3 h-3" />
                {slot.available_spots} spots
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-sm">${slot.price}</div>
              <div className="text-[11px] text-gray-500">per person</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function CalendarGrid({ month, availableDates, selected, onSelect, enableAll = false }: { month: Date; availableDates: string[]; selected: string; onSelect: (d: string) => void; enableAll?: boolean; }) {
  const year = month.getFullYear();
  const mon = month.getMonth();
  const first = new Date(year, mon, 1);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days: JSX.Element[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const ds = d.toISOString().split("T")[0];
    const isCur = d.getMonth() === mon;
    const isPast = d < today;
    const isAvail = enableAll ? true : availableDates.includes(ds);
    const isSel = selected === ds;
    days.push(
      <button
        key={ds}
        onClick={() => isAvail && !isPast && isCur && onSelect(ds)}
        disabled={!isAvail || isPast || !isCur}
        className={`h-9 w-9 rounded text-sm font-medium transition-colors relative ${
          isSel ? "bg-blue-600 text-white" : isAvail && !isPast && isCur ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-gray-300 cursor-not-allowed"
        } ${!isCur ? "opacity-30" : ""}`}
      >
        {d.getDate()}
        {isAvail && !isPast && isCur && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
        )}
      </button>
    );
  }

  return <div className="grid grid-cols-7 gap-1">{days}</div>;
}

function DesignA({ productId }: { productId: number }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [w, setW] = useState(0);

  return (
    <Card className="shadow-lg border-gray-200">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-3">Design A: Standard (Card)</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              variant="outline"
              onClick={() => setW(triggerRef.current?.getBoundingClientRect().width || 0)}
              className="w-full justify-start border-2 border-gray-200 hover:border-blue-300 h-12"
            >
              <CalendarIcon className="w-5 h-5 mr-3 text-blue-600" />
              <span className="text-gray-700">
                {selectedDate && selectedTime ? `${new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • ${formatTimeLabel(selectedTime)}` : "Choose Date & Time"}
              </span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${open ? "rotate-180" : ""}`} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" sideOffset={8} className="p-0 md:min-w-[420px]" style={{ width: w ? `${w}px` : undefined }}>
            <div className="p-3">
              <DesignInner productId={productId} onPicked={(d,t)=>{ setSelectedDate(d); setSelectedTime(t); setOpen(false); }} />
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}

function DesignB({ productId }: { productId: number }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [month, setMonth] = useState(new Date());
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [w, setW] = useState(0);
  const { persons, loading: loadingPersons } = usePersons(productId, 2);
  const { availableDates, loading: loadingMonth } = useMonthAvailability(productId, month, persons);
  const { loading, slots, error, retry } = useDaySlots(productId, open, selectedDate, persons);
  const times = slots.mapped;

  return (
    <Card className="shadow-lg border-gray-200">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-3">Design B: Compact (Calendar + Times)</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              variant="outline"
              onClick={() => setW(triggerRef.current?.getBoundingClientRect().width || 0)}
              className="w-full justify-start border-2 border-gray-200 hover:border-blue-300 h-12"
            >
              <CalendarIcon className="w-5 h-5 mr-3 text-blue-600" />
              <span className="text-gray-700">
                {selectedDate && selectedTime ? `${new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • ${formatTimeLabel(selectedTime)}` : "Select Date & Time"}
              </span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${open ? "rotate-180" : ""}`} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" sideOffset={8} className="p-0 md:min-w-[420px]" style={{ width: w ? `${w}px` : undefined }}>
            <div className="p-3">
              <div className="mb-2 flex items-center justify-between">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}>‹</Button>
                <div className="text-sm font-medium">{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}>›</Button>
              </div>
              {(loadingPersons || loadingMonth) && <div className="text-xs text-gray-500 py-2">Loading availability…</div>}
              <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-gray-500">
                {"SMTWTFS".split("").map((d,i)=>(<div key={i} className="h-6 flex items-center justify-center">{d}</div>))}
              </div>
              <CalendarGrid
                month={month}
                availableDates={availableDates}
                selected={selectedDate}
                onSelect={(d) => setSelectedDate(d)}
              />
              {selectedDate && (
                <div className="mt-3">
                  <div className="text-sm font-medium mb-1">Available Times</div>
                  {error && (
                    <div className="mb-2 text-xs text-red-600 flex items-center justify-between">
                      <span>{error}</span>
                      <Button variant="outline" size="sm" className="h-7 px-2" onClick={retry}>Retry</Button>
                    </div>
                  )}
                  <TimesList
                    slots={times}
                    onPick={(t) => { setSelectedTime(t); setOpen(false); }}
                  />
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}

function DesignC({ productId }: { productId: number }) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [month, setMonth] = useState(new Date());
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [w, setW] = useState(0);
  const { persons, loading: loadingPersons } = usePersons(productId, 2);
  const { availableDates, loading: loadingMonth } = useMonthAvailability(productId, month, persons);
  const { loading, slots, error, retry } = useDaySlots(productId, open, selectedDate, persons);
  const daySlots = slots.mapped;

  return (
    <Card className="shadow-lg border-gray-200">
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-3">Design C: Mobile-first (Chips)</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={triggerRef}
              variant="outline"
              onClick={() => setW(triggerRef.current?.getBoundingClientRect().width || 0)}
              className="w-full justify-start border-2 border-gray-200 hover:border-blue-300 h-12"
            >
              <CalendarIcon className="w-5 h-5 mr-3 text-blue-600" />
              <span className="text-gray-700">
                {selectedDate && selectedTime ? `${new Date(selectedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} • ${formatTimeLabel(selectedTime)}` : "Pick Date & Time"}
              </span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${open ? "rotate-180" : ""}`} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" sideOffset={8} className="p-0 md:min-w-[420px]" style={{ width: w ? `${w}px` : undefined }}>
            <div className="p-3">
              <div className="mb-2 flex items-center justify-between">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}>‹</Button>
                <div className="text-sm font-medium">{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}>›</Button>
              </div>
              {(loadingPersons || loadingMonth) && <div className="text-xs text-gray-500 py-2">Loading…</div>}
              <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-gray-500">
                {"SMTWTFS".split("").map((d,i)=>(<div key={i} className="h-6 flex items-center justify-center">{d}</div>))}
              </div>
              <CalendarGrid
                month={month}
                availableDates={availableDates}
                selected={selectedDate}
                onSelect={setSelectedDate}
              />

              {selectedDate && (
                <div className="mt-3">
                  <div className="text-sm font-medium mb-2">Times</div>
                  {error && (
                    <div className="mb-2 text-xs text-red-600 flex items-center justify-between">
                      <span>{error}</span>
                      <Button variant="outline" size="sm" className="h-7 px-2" onClick={retry}>Retry</Button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {daySlots.length === 0 ? (
                      <div className="text-xs text-gray-500 py-2">No times available</div>
                    ) : (
                      daySlots.map((s) => (
                        <button
                          key={`${s.date}-${s.time}`}
                          onClick={() => { setSelectedTime(s.time); setOpen(false); }}
                          className="px-3 py-2 rounded-full border border-gray-200 text-sm hover:border-blue-300 hover:bg-blue-50"
                        >
                          {formatTimeLabel(s.time)}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}

function DesignInner({ productId, onPicked }: { productId: number; onPicked: (d: string, t: string) => void }) {
  const [month, setMonth] = useState(new Date());
  const [date, setDate] = useState("");
  const { persons, loading: loadingPersons } = usePersons(productId, 2);
  const { availableDates, loading: loadingMonth } = useMonthAvailability(productId, month, persons);
  const { loading, slots, error, retry } = useDaySlots(productId, true, date, persons);
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))}>‹</Button>
        <div className="text-sm font-medium">{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))}>›</Button>
      </div>
      {(loadingPersons || loadingMonth) && <div className="text-xs text-gray-500 py-2">Loading…</div>}
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs text-gray-500">
        {"SMTWTFS".split("").map((d,i)=>(<div key={i} className="h-6 flex items-center justify-center">{d}</div>))}
      </div>
      <CalendarGrid month={month} availableDates={availableDates} selected={date} onSelect={setDate} />
      {date && (
        <div className="mt-3">
          <div className="text-sm font-medium mb-1">Available Times</div>
          {error && (
            <div className="mb-2 text-xs text-red-600 flex items-center justify-between">
              <span>{error}</span>
              <Button variant="outline" size="sm" className="h-7 px-2" onClick={retry}>Retry</Button>
            </div>
          )}
          <TimesList slots={slots.mapped} onPick={(t)=> onPicked(date, t)} />
        </div>
      )}
    </div>
  );
}

export default function CalendarDesignsPage() {
  const productId = 2425;
  return (
    <div className="py-10 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendar Design Options</h1>
          <p className="text-gray-600 text-sm">Design-only showcase • Click a selector to open the full calendar. Times load via the KLSD booking proxy.</p>
        </div>

        <div className="space-y-6">
          <DesignA productId={productId} />
          <DesignB productId={productId} />
          <DesignC productId={productId} />
        </div>
      </div>
    </div>
  );
}
