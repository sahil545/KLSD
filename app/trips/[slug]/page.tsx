import SnorkelingToursTemplate from "../../snorkeling-tours-template/SnorkelingToursTemplate";
import type { TourData } from "../../snorkeling-tours-template/data";
import { wooCommerce } from "../../../client/lib/woocommerce";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

function absoluteUrl(path: string) {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  const proto =
    h.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https");
  return `${proto}://${host}${path}`;
}

async function getProductBySlug(slug: string): Promise<any | null> {
  try {
    const products = await wooCommerce.makeRequest(
      `/products?slug=${encodeURIComponent(slug)}&per_page=1`,
    );
    if (Array.isArray(products) && products.length > 0) return products[0];
  } catch (e) {}
  return null;
}

export default async function TripTemplatePage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  const productId: number = product.id;
  const tourData: TourData | null = product.wcf_tour_data ?? null;

  let data: Partial<TourData> | undefined = undefined;
  if (tourData) {
    data = tourData as TourData;
  } else {
    try {
      const res = await fetch(absoluteUrl(`/api/product-data/${productId}`), {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        data = json?.product?.tourData as Partial<TourData> | undefined;
      }
    } catch {}
  }

  return <SnorkelingToursTemplate data={data} productId={productId} />;
}
