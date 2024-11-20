import type { MetaFunction } from "@remix-run/node";
import { YuzdeHesaplamaComponent } from "./hesaplamalar.yuzde-hesaplama";

export const meta: MetaFunction = () => {
  return [
    { title: "Zam Hesaplama - Maaş Zammı ve Artış Oranı Hesaplama" },
    { name: "description", content: "Maaş zammı, fiyat artışı ve yüzdelik değişim hesaplama aracı. Zam oranı, artış yüzdesi ve değişim oranlarını kolayca hesaplayın." },
    { name: "keywords", content: "zam hesaplama, maaş zammı, artış oranı, yüzde artış, zam oranı hesaplama, maaş artışı, fiyat artışı" },
    { property: "og:title", content: "Zam Hesaplama - Maaş Zammı ve Artış Oranı Hesaplama" },
    { property: "og:description", content: "Maaş zammı, fiyat artışı ve yüzdelik değişim hesaplama aracı. Zam oranı, artış yüzdesi ve değişim oranlarını kolayca hesaplayın." },
    { property: "og:type", content: "website" },
  ];
};

export default function ZamHesaplama() {
  // Get meta data for consistent title and description
  const metaData = meta();
  const pageTitle = metaData.find(item => item.title)?.title ?? "";
  const pageDescription = metaData.find(item => item.name === "description")?.content ?? "";

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{pageTitle.split(" - ")[0]}</h1>
        <p className="text-muted-foreground">
          {pageDescription}
        </p>
      </div>
      <YuzdeHesaplamaComponent />
    </div>
  );
}
