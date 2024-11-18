import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { CurrencySelect } from '~/components/CurrencySelect';
import { ArrowRightLeft } from 'lucide-react';
import { formatCurrency } from '~/lib/utils';

interface CurrencyResult {
  USD: number;
  TRY: number;
  [key: string]: number;
}

interface CurrencyConverterProps {
  amount: string | number;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCurrencyChange: (currency: string) => void;
  result: CurrencyResult;
  currency: string;
  rate: number;
}

function CurrencyInput({
  amount,
  onChange,
  className = '',
}: {
  amount: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <Input
      type="number"
      value={amount}
      onChange={onChange}
      className={`w-[180px] ${className}`}
      placeholder="Miktar giriniz"
      name="amount"
      required
      step="any"
    />
  );
}

function CurrencyResult({
  rate,
  result,
  currency,
}: Pick<CurrencyConverterProps, 'rate' | 'result' | 'currency'>) {
  return (
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
      <div className="flex items-center gap-2">
        <span className="text-3xl">{formatCurrency(rate, currency)}</span>={' '}
        <span className="text-3xl text-emerald-500 underline">
          {formatCurrency(result.TRY, 'TRY')}
        </span>
      </div>
    </h2>
  );
}

export function CurrencyConverter({
  amount,
  onAmountChange,
  onSubmit,
  onCurrencyChange,
  result,
  currency,
  rate,
}: CurrencyConverterProps) {
  return (
    <Card className="mt-4 px-6 py-8 flex gap-4 flex-col">
      <form onSubmit={onSubmit} className="contents">
        <div className="flex flex-row gap-4 items-center">
          <CurrencySelect defaultValue={currency} onChange={onCurrencyChange} />
          {/* TODO: İleride eklenecek
          <Button type="button" variant="outline" size="icon">
            <ArrowRightLeft />
          </Button> */}
          <CurrencySelect defaultValue="TRY" />
          <CurrencyInput amount={amount} onChange={onAmountChange} />
          <Button type="submit" size="lg">
            Hesapla
          </Button>
        </div>
      </form>
      <div>
        <CurrencyResult rate={rate} result={result} currency={currency} />
      </div>
    </Card>
  );
}
