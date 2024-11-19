import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState, memo, useMemo } from "react";
import { codeToSlug } from "~/utils/codeToSlug";

import TradingViewWidget from "~/components/TradingViewWidget";
import { Card, CardHeader } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { CurrencyConverter } from "~/components/CurrencyConverter";
import { PopularAmounts } from "~/components/PopularAmounts";
import { ScrollArea } from "~/components/ui/scroll-area";
import { loader } from "~/loaders/currency-rate.server";
import type { CurrencyRateLoaderData } from "~/types/currency";

// SEO meta bilgileri
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];
  const { calculation, currentRate } = data;
  const title = `${calculation.amount} ${currentRate.name} kaç TL`;

  return [
    { title },
    {
      name: "description",
      content: `${currentRate.name} döviz kuru güncel bilgileri ve çevrim hesaplamaları. Güncel kur: ${calculation.amount}`,
    },
    { property: "og:title", content: `${currentRate.name} Döviz Kuru` },
    {
      property: "og:description",
      content: `Güncel ${currentRate.name} kuru: ${calculation.amount}`,
    },
    { name: "robots", content: "index, follow" },
    {
      name: "canonical",
      content: `https://sizinsayfaniz.com/doviz/${calculation.currencySlug}/${calculation.amount}`,
    },
  ];
};

// Trading widget memorize edilmiş component
const MemoizedTradingViewWidget = memo(TradingViewWidget);

// State tipleri
interface CurrencyResultState {
  [key: string]: number;
  TRY: number;
}

// Breadcrumb konfigürasyonu
export const handle = {
  breadcrumb: (match: {
    data?: CurrencyRateLoaderData;
    params: { currency: string; rate: string };
  }) => ({
    label: match.data
      ? `${match.data.calculation.amount} ${match.data.currentRate.name}`
      : "Döviz Detay",
    href: `/doviz/${match.params.currency}${
      match.params.rate ? `/${match.params.rate}` : ""
    }`,
  }),
};

// Ana component
export default function CurrencyRate() {
  // Hooks ve state
  const { calculation, currentRate, source } = useLoaderData<CurrencyRateLoaderData>();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState(calculation.currencySlug);
  const [amount, setAmount] = useState<number | "">(calculation.amount);
  const [result, setResult] = useState<CurrencyResultState>({
    [calculation.currencyCode]: calculation.amount,
    TRY: parseFloat(calculation.sellingTotal),
  });

  // Event handlers
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value === "" ? "" : parseFloat(value));
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(codeToSlug(newCurrency));
  };

  const handleCalculate = () => {
    if (typeof amount !== "number" || isNaN(amount) || amount === 0) return;

    const exchangeRate = parseFloat(currentRate.selling_rate.replace(",", "."));
    const calculatedResult = amount * exchangeRate;

    setResult({
      [calculation.currencyCode]: amount,
      TRY: calculatedResult,
    });

    // URL formatı: /doviz/usd/100-amerikan-dolari-kac-tl
    const formattedAmount = amount.toString().replace(".", "-");
    navigate(
      `/doviz/${currency}/${formattedAmount}-${currency.toLowerCase()}-kac-tl`
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCalculate();
  };

  // Trading widget sembolü
  const tradingPairData = useMemo(() => {
    const tradingPair = `${calculation.currencyCode}TRY`;
    return [[tradingPair, `${tradingPair}|1M`]];
  }, [calculation.currencyCode]);

  // Popüler tutarlar
  const popularAmounts = [10, 100, 500, 1000, 5000, 10000];

  return (
    <div className="mx-auto flex gap-12">
      <div className="max-w-[974px]">
        {/* Başlık ve Rozetler */}
        <div className="flex gap-2 items-center mt-6">
          <Badge variant={source === "firestore" ? "outline" : "default"}>
            {source === "firestore" ? "Firestore" : "Cache"}
          </Badge>
          <Badge>{calculation.currencyCode}</Badge>
          <div>-</div>
          <Badge variant="outline">TRY</Badge>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
          {calculation.amount} {currentRate.name} kaç TL ?
        </h1>

        {/* Döviz Çevirici */}
        <CurrencyConverter
          amount={amount}
          onAmountChange={handleAmountChange}
          onSubmit={handleSubmit}
          onCurrencyChange={handleCurrencyChange}
          result={result}
          rate={calculation.amount}
          currency={calculation.currencyCode}
        />

        {/* Popüler Tutarlar */}
        <PopularAmounts
          currency={calculation.currencyCode}
          amounts={popularAmounts}
        />

        {/* Grafik */}
        <Card className="h-[400px] w-[900px] mt-4">
          <CardHeader>{calculation.currencyCode}/TRY Grafiği</CardHeader>
          <MemoizedTradingViewWidget symbol={tradingPairData} />
        </Card>
      </div>

      {/* Yan Panel */}
      <div className="w-full">
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {/* Burada ek bilgiler veya haberler gösterilebilir */}
        </ScrollArea>
      </div>
    </div>
  );
}

export { loader };
