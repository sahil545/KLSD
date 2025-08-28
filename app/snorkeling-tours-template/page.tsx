import { tourData } from "./data";
import SnorkelingToursTemplate from "./SnorkelingToursTemplate";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SnorkelingToursTemplatePage({
  searchParams,
}: PageProps) {
  return <SnorkelingToursTemplate data={tourData} productId={34592} />;
}
