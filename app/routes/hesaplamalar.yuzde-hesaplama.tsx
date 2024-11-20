import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Yüzde Hesaplama - Yüzdelik Oran ve Değişim Hesaplama" },
    { name: "description", content: "Yüzde hesaplama, yüzdelik oran ve değişim hesaplama aracı. Basit yüzde, artış/azalış oranı ve yüzdelik değişimleri kolayca hesaplayın." },
    { name: "keywords", content: "yüzde hesaplama, yüzdelik hesaplama, oran hesaplama, yüzde artış, yüzde azalış, yüzde değişimi" },
    { property: "og:title", content: "Yüzde Hesaplama - Yüzdelik Oran ve Değişim Hesaplama" },
    { property: "og:description", content: "Yüzde hesaplama, yüzdelik oran ve değişim hesaplama aracı. Basit yüzde, artış/azalış oranı ve yüzdelik değişimleri kolayca hesaplayın." },
    { property: "og:type", content: "website" },
  ];
};

// Reusable calculator component
export function YuzdeHesaplamaComponent() {
  // State and functions from the original component...
  const [number, setNumber] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [basicResult, setBasicResult] = useState<string>("");

  const [originalAmount, setOriginalAmount] = useState<string>("");
  const [percentageChange, setPercentageChange] = useState<string>("");
  const [increaseResult, setIncreaseResult] = useState<string>("");

  const [xValue, setXValue] = useState<string>("");
  const [yValue, setYValue] = useState<string>("");
  const [percentageOfResult, setPercentageOfResult] = useState<string>("");

  const [initialValue, setInitialValue] = useState<string>("");
  const [finalValue, setFinalValue] = useState<string>("");
  const [changeResult, setChangeResult] = useState<string>("");

  // Clear functions
  const clearBasicCalculator = () => {
    setNumber("");
    setPercentage("");
    setBasicResult("");
  };

  const clearIncreaseCalculator = () => {
    setOriginalAmount("");
    setPercentageChange("");
    setIncreaseResult("");
  };

  const clearPercentageOfCalculator = () => {
    setXValue("");
    setYValue("");
    setPercentageOfResult("");
  };

  const clearChangeCalculator = () => {
    setInitialValue("");
    setFinalValue("");
    setChangeResult("");
  };

  // Calculate functions
  const calculateBasicPercentage = () => {
    if (number && percentage) {
      const result = (parseFloat(number) * parseFloat(percentage)) / 100;
      setBasicResult(result.toFixed(2));
    }
  };

  const calculatePercentageChange = () => {
    if (originalAmount && percentageChange) {
      const amount = parseFloat(originalAmount);
      const change = parseFloat(percentageChange);
      const result = amount + (amount * change) / 100;
      setIncreaseResult(result.toFixed(2));
    }
  };

  const calculatePercentageOf = () => {
    if (xValue && yValue) {
      const x = parseFloat(xValue);
      const y = parseFloat(yValue);
      const result = (x / y) * 100;
      setPercentageOfResult(result.toFixed(2));
    }
  };

  const calculateChange = () => {
    if (initialValue && finalValue) {
      const initial = parseFloat(initialValue);
      const final = parseFloat(finalValue);
      const result = ((final - initial) / initial) * 100;
      setChangeResult(result.toFixed(2));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Basic Percentage Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Basit Yüzde Hesaplama
            <Badge>Temel</Badge>
          </CardTitle>
          <CardDescription>
            Bir sayının belirli bir yüzdesini hesaplayın.
            Örnek: 2500 TL'nin %18'i (KDV) ne kadardır?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number">Sayı (A)</Label>
              <Input
                id="number"
                type="number"
                placeholder="Örn: 2500"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentage">Yüzde (B%)</Label>
              <Input
                id="percentage"
                type="number"
                placeholder="Örn: 18"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
            </div>
            {basicResult && (
              <div className="mt-4 p-4 bg-muted rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Sonuç:</p>
                <p className="text-2xl font-bold text-primary">{basicResult}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {number} sayısının %{percentage}'si {basicResult}'dir
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <Button onClick={calculateBasicPercentage} className="flex-1">
                Hesapla
              </Button>
              <Button onClick={clearBasicCalculator} variant="outline" className="flex-1">
                Temizle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Percentage Increase/Decrease Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Artış/Azalış Hesaplama
            <Badge variant="secondary">Değişim</Badge>
          </CardTitle>
          <CardDescription>
            Bir sayının yüzdelik artış veya azalışını hesaplayın.
            Örnek: 5000 TL maaş %25 zam alırsa ne kadar olur?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="originalAmount">Başlangıç Değeri (A)</Label>
              <Input
                id="originalAmount"
                type="number"
                placeholder="Örn: 5000"
                value={originalAmount}
                onChange={(e) => setOriginalAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="percentageChange">Değişim Yüzdesi (B%)</Label>
              <Input
                id="percentageChange"
                type="number"
                placeholder="Artış için pozitif (25), azalış için negatif (-25)"
                value={percentageChange}
                onChange={(e) => setPercentageChange(e.target.value)}
              />
            </div>
            {increaseResult && (
              <div className="mt-4 p-4 bg-muted rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Sonuç:</p>
                <p className="text-2xl font-bold text-primary">{increaseResult}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {originalAmount} değerinin %{percentageChange} {parseFloat(percentageChange) >= 0 ? "artışı" : "azalışı"} {increaseResult}'dir
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <Button onClick={calculatePercentageChange} className="flex-1">
                Hesapla
              </Button>
              <Button onClick={clearIncreaseCalculator} variant="outline" className="flex-1">
                Temizle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What Percentage Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Yüzde Oranı Hesaplama
            <Badge variant="outline">Oran</Badge>
          </CardTitle>
          <CardDescription>
            Bir sayının diğer sayıya göre yüzdesini hesaplayın.
            Örnek: 1200 TL, 4000 TL'nin yüzde kaçıdır?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="xValue">İlk Sayı (A)</Label>
              <Input
                id="xValue"
                type="number"
                placeholder="Örn: 1200"
                value={xValue}
                onChange={(e) => setXValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yValue">İkinci Sayı (B)</Label>
              <Input
                id="yValue"
                type="number"
                placeholder="Örn: 4000"
                value={yValue}
                onChange={(e) => setYValue(e.target.value)}
              />
            </div>
            {percentageOfResult && (
              <div className="mt-4 p-4 bg-muted rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Sonuç:</p>
                <p className="text-2xl font-bold text-primary">%{percentageOfResult}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {xValue}, {yValue}'nin %{percentageOfResult}'sidir
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <Button onClick={calculatePercentageOf} className="flex-1">
                Hesapla
              </Button>
              <Button onClick={clearPercentageOfCalculator} variant="outline" className="flex-1">
                Temizle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Percentage Change Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Değişim Oranı Hesaplama
            <Badge variant="destructive">Fark</Badge>
          </CardTitle>
          <CardDescription>
            İki sayı arasındaki yüzdelik değişimi hesaplayın.
            Örnek: Ev fiyatı 2.000.000 TL'den 2.800.000 TL'ye çıkarsa artış oranı nedir?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="initialValue">Başlangıç Değeri (A)</Label>
              <Input
                id="initialValue"
                type="number"
                placeholder="Örn: 2000000"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalValue">Son Değer (B)</Label>
              <Input
                id="finalValue"
                type="number"
                placeholder="Örn: 2800000"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
              />
            </div>
            {changeResult && (
              <div className="mt-4 p-4 bg-muted rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Sonuç:</p>
                <p className="text-2xl font-bold text-primary">%{changeResult}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {initialValue}'den {finalValue}'e değişim %{changeResult}'dir
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <Button onClick={calculateChange} className="flex-1">
                Hesapla
              </Button>
              <Button onClick={clearChangeCalculator} variant="outline" className="flex-1">
                Temizle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Page component
export default function YuzdeHesaplama() {
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
