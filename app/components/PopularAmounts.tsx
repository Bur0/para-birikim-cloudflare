import { Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';

interface PopularAmountsProps {
  currency: string;
  amounts: number[];
}

export function PopularAmounts({ currency, amounts }: PopularAmountsProps) {
  const currencyLower = currency.toLowerCase();

  return (
    <div className="flex gap-2 mt-4 flex-wrap">
      {amounts.map((amount) => (
        <Button key={amount} variant="outline" asChild>
          <Link to={`/doviz/${currencyLower}/${amount}`}>
            {amount} {currencyLower} kaç tl
          </Link>
        </Button>
      ))}
    </div>
  );
}
