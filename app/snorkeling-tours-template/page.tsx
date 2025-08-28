"use client";

import dynamic from "next/dynamic";
import { tourData } from "./data";

const SnorkelingToursTemplate = dynamic(
  () => import("./SnorkelingToursTemplate-minimal"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Loading...</h1>
      </div>
    )
  }
);

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SnorkelingToursTemplatePage({ searchParams }: PageProps) {
  return <SnorkelingToursTemplate data={tourData} productId={34592} />;
}
