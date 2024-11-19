import type { MetaFunction } from "@remix-run/cloudflare";
import { Link } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ScrollArea } from "~/components/ui/scroll-area";
import TradingViewWidget from "~/components/TradingViewWidget";

export const meta: MetaFunction = () => {
  return [
    { title: "Para Birikim - Döviz, Altın ve Borsa Takibi" },
    {
      name: "description",
      content: "Güncel döviz kurları, altın fiyatları ve borsa verileri",
    },
  ];
};

export const handle = {
  breadcrumb: "Ana Sayfa",
};

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Finansal Veriler ve Piyasa Takibi
        </h1>
        <p className="text-lg text-muted-foreground">
          Güncel döviz kurları, altın fiyatları ve borsa verilerini takip edin
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Döviz Kurları Kartı */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Döviz Kurları
              <Badge>Canlı</Badge>
            </CardTitle>
            <CardDescription>Güncel döviz kurları</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                <Link
                  to="/doviz/usd"
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">USD/TRY</span>
                    <Badge variant="outline">Dolar</Badge>
                  </div>
                  <span className="text-right font-medium">32.15 ₺</span>
                </Link>
                <Link
                  to="/doviz/eur"
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">EUR/TRY</span>
                    <Badge variant="outline">Euro</Badge>
                  </div>
                  <span className="text-right font-medium">34.80 ₺</span>
                </Link>
                <Link
                  to="/doviz/gbp"
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent"
                >
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">GBP/TRY</span>
                    <Badge variant="outline">Sterlin</Badge>
                  </div>
                  <span className="text-right font-medium">40.55 ₺</span>
                </Link>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Altın Fiyatları Kartı */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Altın Fiyatları
              <Badge>Canlı</Badge>
            </CardTitle>
            <CardDescription>Güncel altın fiyatları</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">Gram Altın</span>
                    <Badge variant="outline">GAU</Badge>
                  </div>
                  <span className="text-right font-medium">2.150 ₺</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">Çeyrek Altın</span>
                    <Badge variant="outline">QAU</Badge>
                  </div>
                  <span className="text-right font-medium">3.520 ₺</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">Cumhuriyet Altını</span>
                    <Badge variant="outline">CAU</Badge>
                  </div>
                  <span className="text-right font-medium">14.250 ₺</span>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Borsa Kartı */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Borsa
              <Badge>BIST</Badge>
            </CardTitle>
            <CardDescription>Borsa İstanbul verileri</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">BIST 100</span>
                    <Badge variant="outline">XU100</Badge>
                  </div>
                  <span className="text-right font-medium">9.245,78</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">BIST 30</span>
                    <Badge variant="outline">XU030</Badge>
                  </div>
                  <span className="text-right font-medium">10.123,45</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">BIST Bankacılık</span>
                    <Badge variant="outline">XBANK</Badge>
                  </div>
                  <span className="text-right font-medium">4.567,89</span>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Grafik Bölümü */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>USD/TRY Grafiği</CardTitle>
            <CardDescription>Son 1 aylık değişim</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <TradingViewWidget symbol={[["USDTRY", "USDTRY|1M"]]} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
