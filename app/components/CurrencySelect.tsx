import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Badge } from '~/components/ui/badge';
import { currencies } from '~/lib/currencies';
import { cn } from '~/lib/utils';

interface CurrencySelectProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

function CurrencyBadge({ code, className }: { code: string; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs transform scale-75 group-hover:bg-blue-500 group-hover:text-white',
        className
      )}
    >
      {code}
    </Badge>
  );
}

function CurrencyOption({ currency }: { currency: (typeof currencies)[number] }) {
  return (
    <SelectItem key={currency.code} value={currency.code} className="flex items-center gap-2 group">
      {currency.flag} {currency.showBadge && <CurrencyBadge code={currency.code} />} {currency.name}
    </SelectItem>
  );
}

export function CurrencySelect({ defaultValue = 'USD', onChange, className }: CurrencySelectProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <SelectTrigger className={cn('w-[180px]', className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {currencies.map((currency) => (
          <CurrencyOption key={currency.code} currency={currency} />
        ))}
      </SelectContent>
    </Select>
  );
}
