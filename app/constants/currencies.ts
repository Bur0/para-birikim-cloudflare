export const CURRENCY_MAPPING: Record<string, string> = {
  dolar: 'USD',
  euro: 'EUR',
  sterlin: 'GBP',
};

export const SYMBOL_TO_CURRENCY = Object.entries(CURRENCY_MAPPING).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [value]: key,
  }),
  {} as Record<string, string>
);
