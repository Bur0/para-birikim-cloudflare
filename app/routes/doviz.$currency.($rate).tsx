import type { MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useState, memo, useMemo } from 'react';
import { codeToSlug } from '~/utils/codeToSlug';

import TradingViewWidget from '~/components/TradingViewWidget';
import { Card, CardHeader } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { CurrencyConverter } from '~/components/CurrencyConverter';
import { PopularAmounts } from '~/components/PopularAmounts';
import { ScrollArea } from '~/components/ui/scroll-area';
import { loader } from '~/loaders/currency-rate.server';
import type { CurrencyRateLoaderData } from '~/types/currency';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [];

  const { calculation } = data;
  return [
    { title: `${calculation.rate} ${calculation.currencyName} kaç tl` },
    {
      name: 'description',
      content: `${calculation.currencyName} döviz kuru güncel bilgileri ve çevrim hesaplamaları. Güncel kur: ${calculation.rate}`,
    },
    { property: 'og:title', content: `${calculation.currencyName} Döviz Kuru` },
    {
      property: 'og:description',
      content: `Güncel ${calculation.currencyName} kuru: ${calculation.rate}`,
    },
    { name: 'robots', content: 'index, follow' },
    {
      name: 'canonical',
      content: `https://sizinsayfaniz.com/doviz/${calculation.currencySlug}/${calculation.rate}`,
    },
  ];
};

const MemoizedTradingViewWidget = memo(TradingViewWidget);

interface CurrencyResultState {
  [key: string]: number;
  TRY: number;
}

export const handle = {
  breadcrumb: (match: {
    data?: CurrencyRateLoaderData;
    params: { currency: string; rate: string };
  }) => ({
    label: match.data
      ? `${match.data.calculation.rate} ${match.data.calculation.currencyName}`
      : 'Döviz Detay',
    href: `/doviz/${match.params.currency}${match.params.rate ? `/${match.params.rate}` : ''}`,
  }),
};

export default function CurrencyRate() {
  const { calculation, source } = useLoaderData<CurrencyRateLoaderData>();
  const navigate = useNavigate();

  const [currency, setCurrency] = useState<string>(codeToSlug(calculation.currencyCode));

  const [amount, setAmount] = useState<number | ''>(calculation.rate);
  const [result, setResult] = useState<CurrencyResultState>({
    [calculation.currencyCode]: calculation.rate,
    TRY: calculation.converted.TRY,
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value === '' ? '' : parseFloat(value));
  };

  const handleCurrencyChange = (currency: string) => {
    const slug = codeToSlug(currency);
    setCurrency(slug);
  };

  const handleCalculate = () => {
    if (typeof amount !== 'number' || isNaN(amount) || amount === 0) return;

    const exchangeRate = parseFloat(calculation.currentRate.selling_rate.replace(',', '.'));
    setResult({
      [calculation.currencyCode]: amount,
      TRY: amount * exchangeRate,
    });

    const [whole, decimal] = amount.toString().split('.');
    const formattedAmount = decimal ? `${whole}-${decimal}` : whole;

    navigate(
      `/doviz/${currency}/${formattedAmount}-${calculation.currencyHref.toLowerCase()}-kac-tl`
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCalculate();
  };

  const tradingPairData = useMemo(() => {
    const tradingPair = `${calculation.currencyCode}TRY`;
    const tradingPairWithPeriod = `${tradingPair}|1M`;
    return [[tradingPair, tradingPairWithPeriod]];
  }, [calculation.currencyCode]);

  const popularAmounts = [10, 100, 123, 41, 4123, 534];

  return (
    <div className="mx-auto flex gap-12">
      <div className="max-w-[974px]">
        <div className="flex gap-2 items-center mt-6">
          {source === 'firestore' ? (
            <Badge variant="outline">Firestore</Badge>
          ) : (
            <Badge>Cache</Badge>
          )}
          <Badge>{calculation.currencyCode}</Badge>
          <div>-</div>
          <Badge variant="outline">TRY</Badge>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">
          <span>{calculation.rate}</span> {calculation.currencyName} kaç TL ?
        </h1>

        <CurrencyConverter
          amount={amount}
          onAmountChange={handleAmountChange}
          onSubmit={handleSubmit}
          onCurrencyChange={handleCurrencyChange}
          result={result}
          rate={calculation.rate}
          currency={calculation.currencyCode}
        />
        <PopularAmounts currency={calculation.currencyCode} amounts={popularAmounts} />
        <Card className="h-[400px] w-[900px] mt-4">
          <CardHeader>{calculation.currencyCode}/TRY Grafiği</CardHeader>
          <MemoizedTradingViewWidget symbol={tradingPairData} />
        </Card>
      </div>
      <div className="w-full">
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {/* Burada ek bilgiler veya haberler gösterilebilir */}
        </ScrollArea>
      </div>
    </div>
  );
}

export { loader };
