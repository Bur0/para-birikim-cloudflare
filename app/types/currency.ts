export interface Currency {
  symbol: string;
  name: string;
  tr_slug: string;
  buying_rate: string;
  selling_rate: string;
  change: string;
  high: string;
  low: string;
  code: string;
}

export interface ExchangeRates {
  latest: {
    currencies: Record<string, Currency>;
  };
}

export interface LoaderData {
  rates: ExchangeRates;
  error?: string;
  source: 'cache' | 'firestore';
}

export interface CurrencyCalculation {
  currencyCode: string;
  currencySlug: string;
  currencyName: string;
  currencyHref: string;
  rate: number;
  converted: {
    TRY: number;
    [key: string]: number;
  };
  currentRate: Currency;
}

export interface CurrencyRateLoaderData {
  calculation: CurrencyCalculation;
  source: 'cache' | 'firestore';
}
