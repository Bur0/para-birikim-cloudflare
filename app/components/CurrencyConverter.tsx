import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { CurrencySelect } from "~/components/CurrencySelect";
import { ArrowRightLeft } from "lucide-react";
import { formatCurrency } from "~/utils/currency";

interface CurrencyResult {
  amount: number;
  convertedAmount: number;
  fromCurrency: string;
  toCurrency: string;
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
  className = "",
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

function CurrencyResult({ result }: { result: CurrencyResult }) {
  return (
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
      <div className="flex items-center gap-2">
        <span className="text-3xl">
          {formatCurrency(result.amount, result.fromCurrency)}
        </span>
        =
        <span className="text-3xl text-emerald-500 underline">
          {formatCurrency(result.convertedAmount, result.toCurrency)}
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
}: CurrencyConverterProps) {
  return (
    <Card className="mt-4 px-6 py-8 flex gap-4 flex-col">
      <form onSubmit={onSubmit} className="contents">
        <div className="flex flex-row gap-4 items-center">
          <CurrencySelect defaultValue={currency} onChange={onCurrencyChange} />
          <CurrencySelect defaultValue="TRY" disabled />
          <CurrencyInput amount={amount} onChange={onAmountChange} />
          <Button type="submit" size="lg">
            Hesapla
          </Button>
        </div>
      </form>
      <div>
        <CurrencyResult result={result} />
      </div>
    </Card>
  );
}
