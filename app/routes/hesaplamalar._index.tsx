import type { MetaFunction } from "@remix-run/node";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Finansal Hesaplama Araçları - Para Biriktirme ve Yatırım Hesaplamaları" },
    { name: "description", content: "Yüzde hesaplama, zam hesaplama, faiz hesaplama gibi finansal hesaplama araçları. Yatırım ve para biriktirme kararlarınız için ücretsiz hesaplama araçları." },
    { name: "keywords", content: "finansal hesaplama, yüzde hesaplama, zam hesaplama, faiz hesaplama, yatırım hesaplama, para biriktirme" },
    { property: "og:title", content: "Finansal Hesaplama Araçları - Para Biriktirme ve Yatırım Hesaplamaları" },
    { property: "og:description", content: "Yüzde hesaplama, zam hesaplama, faiz hesaplama gibi finansal hesaplama araçları. Yatırım ve para biriktirme kararlarınız için ücretsiz hesaplama araçları." },
    { property: "og:type", content: "website" },
  ];
};

export default function HesaplamalarIndex() {
  const calculators = [
    {
      title: "Yüzde Hesaplama",
      description: "Basit yüzde, artış/azalış oranı ve yüzdelik değişim hesaplamaları yapın.",
      href: "/hesaplamalar/yuzde-hesaplama",
    },
    {
      title: "Zam Hesaplama",
      description: "Maaş zammı ve fiyat artışı hesaplamaları için kullanabileceğiniz hesaplama aracı.",
      href: "/hesaplamalar/zam-hesaplama",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Finansal Hesaplama Araçları</h1>
        <p className="text-muted-foreground">
          Para biriktirme ve yatırım kararlarınız için ücretsiz hesaplama araçları
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => (
          <Link key={calculator.href} to={calculator.href} className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>{calculator.title}</CardTitle>
                <CardDescription>{calculator.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
