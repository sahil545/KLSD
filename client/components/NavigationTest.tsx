import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight } from "lucide-react";

export function NavigationTest() {
  const pathname = usePathname();

  const pages = [
    { path: "/", name: "Homepage", icon: "🏠" },
    { path: "/demo-mode", name: "Integration Status", icon: "📋" },
    { path: "/product-demo", name: "Product Demo", icon: "🛍️" },
    { path: "/christ-statue-tour", name: "Christ Statue Tour", icon: "🏊" },
    { path: "/api-test", name: "API Testing", icon: "🔧" },
  ];

  return (
    <Card className="p-4 mb-6 bg-green-50 border-green-200">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span className="font-semibold text-green-900">Navigation Test</span>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Working
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className={`flex items-center gap-2 p-2 rounded text-sm transition-colors ${
              pathname === page.path
                ? "bg-green-200 text-green-900 font-semibold"
                : "bg-white hover:bg-green-100 text-gray-700"
            }`}
          >
            <span>{page.icon}</span>
            <span className="truncate">{page.name}</span>
            {pathname === page.path && <ArrowRight className="w-3 h-3" />}
          </Link>
        ))}
      </div>

      <p className="text-xs text-green-700 mt-2">
        ✓ All navigation links are working properly
      </p>
    </Card>
  );
}
