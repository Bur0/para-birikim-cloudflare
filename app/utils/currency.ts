export const formatCurrencyValue = (value: string) => parseFloat(value.replace(',', '.'));

export const getCurrencyBadgeColor = (change: number) => {
  if (change > 0) return 'bg-green-100 text-green-800 hover:bg-green-100';
  if (change < 0) return 'bg-red-100 text-red-800 hover:bg-red-100';
  return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
};

export const currencyFormatter = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const sortCurrencies = (currencies: Record<string, any>) => {
  return Object.entries(currencies).sort(([codeA], [codeB]) => {
    const priorityOrder = ['USD', 'EUR', 'GBP'];
    const indexA = priorityOrder.indexOf(codeA);
    const indexB = priorityOrder.indexOf(codeB);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return codeA.localeCompare(codeB);
  });
};
