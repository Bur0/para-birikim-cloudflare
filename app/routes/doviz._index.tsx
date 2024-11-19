import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { loader } from "~/loaders/currency.server";
import {
  formatCurrencyValue,
  getCurrencyBadgeColor,
  currencyFormatter,
  sortCurrencies,
} from "~/utils/currency";
import type { Currency, LoaderData } from "~/types/currency";

const TableHeaders = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Para Birimi</TableHead>
      <TableHead className="text-right hidden md:table-cell">Alış</TableHead>
      <TableHead className="text-right">Satış</TableHead>
      <TableHead className="text-right">Değişim</TableHead>
      <TableHead className="text-right hidden md:table-cell">
        En Yüksek
      </TableHead>
      <TableHead className="text-right pr-4 hidden md:table-cell">
        En Düşük
      </TableHead>
    </TableRow>
  </TableHeader>
);

interface CurrencyRowProps {
  code: string;
  currency: Currency;
}

const CurrencyRow = ({ code, currency }: CurrencyRowProps) => (
  <TableRow key={code}>
    <TableCell className="group py-5 px-4">
      <Link
        to={`/doviz/${currency.tr_slug}`}
        className="flex items-center hover:text-blue-500"
      >
        <Badge className="w-10 h-5 flex items-center justify-center mr-3 bg-gray-100 text-gray-800 group-hover:bg-blue-500 group-hover:text-white">
          {currency.symbol}
        </Badge>
        <span className="text-base font-bold">{currency.name}</span>
      </Link>
    </TableCell>
    <TableCell className="text-right py-4 hidden md:table-cell">
      {currencyFormatter.format(formatCurrencyValue(currency.buying_rate))}
    </TableCell>
    <TableCell className="text-right py-4">
      {currencyFormatter.format(formatCurrencyValue(currency.selling_rate))}
    </TableCell>
    <TableCell className="text-right py-4">
      <Badge className={getCurrencyBadgeColor(currency.change)}>
        %{currency.change}
      </Badge>
    </TableCell>
    <TableCell className="text-right py-4 hidden md:table-cell">
      {currencyFormatter.format(formatCurrencyValue(currency.high))}
    </TableCell>
    <TableCell className="text-right py-4 pr-4 hidden md:table-cell">
      {currencyFormatter.format(formatCurrencyValue(currency.low))}
    </TableCell>
  </TableRow>
);

export { loader };

export const handle = {
  breadcrumb: () => ({
    label: "Tüm Kurlar",
    href: "/doviz",
  }),
};

export default function DovizPage() {
  const { rates, error, source } = useLoaderData<typeof loader>();
  const currencies = rates?.latest?.currencies || {};
  const sortedCurrencies = sortCurrencies(currencies);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCurrencies = searchTerm
    ? sortedCurrencies.filter(([code, currency]) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          code.toLowerCase().includes(searchLower) ||
          currency.name.toLowerCase().includes(searchLower) ||
          currency.symbol.toLowerCase().includes(searchLower)
        );
      })
    : sortedCurrencies;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2 mb-4">
        Döviz Kurları
      </h1>

      <div className="text-sm text-gray-500 mb-4">
        Veri kaynağı: {source === "cache" ? "Önbellek" : "Firestore"}
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <div className="text-red-700">{error}</div>
        </div>
      ) : (
        <Card className="max-w-[974px]">
          <div className="p-4">
            <Input
              type="search"
              placeholder="Para birimi ara... (TRY, Dolar, USD)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeaders />
            <TableBody>
              {filteredCurrencies.map(([code, currency]) => (
                <CurrencyRow key={code} code={code} currency={currency} />
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
