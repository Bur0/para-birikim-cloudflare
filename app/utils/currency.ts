export const formatCurrencyValue = (value: string) => parseFloat(value.replace(',', '.'));

export const getCurrencyBadgeColor = (change: string | number) => {
  // Convert string input to number if it's a string
  const numericValue = typeof change === 'string' 
    ? Number(change.replace(',', '.'))
    : change;

  if (numericValue > 0) return 'bg-green-100 text-green-800 hover:bg-green-100';
  if (numericValue < 0) return 'bg-red-100 text-red-800 hover:bg-red-100';
  return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
};

export const createCurrencyFormatter = (currency: string) => new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency,
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

export const formatCurrency = (amount: number, currency: string) => {
  const formatter = createCurrencyFormatter(currency);
  return formatter.format(amount);
};

export const normalizeCurrencyCode = (currency: string): string => {
  const currencyMap: Record<string, string> = {
    'dolar': 'USD',
    'euro': 'EUR',
    'sterlin': 'GBP',
    'TL': 'TRY',
    'japon-yeni': 'JPY',
    'avustralya-dolari': 'AUD',
    'kanada-dolari': 'CAD',
    'frank': 'CHF',
    'bae-dirhemi': 'AED',
    'arnavutluk-leki': 'ALL',
    'arjantin-pesosu': 'ARS',
    'azerbaycan-manati': 'AZN',
    'bosna-hersek-marki': 'BAM',
    'bulgar-levasi': 'BGN',
    'bahreyn-dinari': 'BHD',
    'brezilya-reali': 'BRL',
    'sili-pesosu': 'CLP',
    'cin-yuani': 'CNY',
    'kolombiya-pesosu': 'COP',
    'kostarika-kolonu': 'CRC',
    'cek-korunasi': 'CZK',
    'danimarka-kronu': 'DKK',
    'cezayir-dinari': 'DZD',
    'misir-lirasi': 'EGP',
    'gurcistan-larisi': 'GEL',
    'hong-kong-dolari': 'HKD',
    'macar-forinti': 'HUF',
    'endonezya-rupiahi': 'IDR',
    'israil-sekeli': 'ILS',
    'hindistan-rupisi': 'INR',
    'irak-dinari': 'IQD',
    'iran-riyali': 'IRR',
    'izlanda-kronasi': 'ISK',
    'urdun-dinari': 'JOD',
    'guney-kore-wonu': 'KRW',
    'kuveyt-dinari': 'KWD',
    'kazak-tengesi': 'KZT',
    'lubnan-lirasi': 'LBP',
    'sri-lanka-rupisi': 'LKR',
    'libya-dinari': 'LYD',
    'fas-dirhemi': 'MAD',
    'moldovya-leusu': 'MDL',
    'makedon-dinari': 'MKD',
    'meksika-pesosu': 'MXN',
    'malezya-ringgiti': 'MYR',
    'norvec-kronu': 'NOK',
    'yeni-zelanda-dolari': 'NZD',
    'umman-riyali': 'OMR',
    'peru-inti': 'PEN',
    'filipinler-pesosu': 'PHP',
    'pakistan-rupisi': 'PKR',
    'polonya-zlotisi': 'PLN',
    'katar-riyali': 'QAR',
    'romanya-leyi': 'RON',
    'sirbistan-dinari': 'RSD',
    'rus-rublesi': 'RUB',
    'suudi-arabistan-riyali': 'SAR',
    'isvec-kronu': 'SEK',
    'singapur-dolari': 'SGD',
    'suriye-lirasi': 'SYP',
    'tayland-bahti': 'THB',
    'tunus-dinari': 'TND',
    'yeni-tayvan-dolari': 'TWD',
    'ukrayna-grivnasi': 'UAH',
    'uruguay-pesosu': 'UYU',
    'guney-afrika-randi': 'ZAR'
  };

  // Ters harita oluştur (ISO -> Türkçe isim)
  const reverseMap: Record<string, string> = Object.entries(currencyMap).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as Record<string, string>);

  const input = currency.toLowerCase();
  
  // Önce normal haritada ara
  if (currencyMap[input]) {
    return currencyMap[input];
  }
  
  // Sonra ters haritada ara
  const upperInput = input.toUpperCase();
  if (reverseMap[upperInput]) {
    return reverseMap[upperInput];
  }
  
  // Bulunamazsa gelen değeri aynen döndür
  return upperInput;
};

export const getLocalizedCurrencyName = (currencyCode: string): string => {
  const currencyMap: Record<string, string> = {
    'USD': 'dolar',
    'EUR': 'euro',
    'GBP': 'sterlin',
    'TRY': 'TL',
    'JPY': 'japon-yeni',
    'AUD': 'avustralya-dolari',
    'CAD': 'kanada-dolari',
    'CHF': 'frank',
    'AED': 'bae-dirhemi',
    'ALL': 'arnavutluk-leki',
    'ARS': 'arjantin-pesosu',
    'AZN': 'azerbaycan-manati',
    'BAM': 'bosna-hersek-marki',
    'BGN': 'bulgar-levasi',
    'BHD': 'bahreyn-dinari',
    'BRL': 'brezilya-reali',
    'CLP': 'sili-pesosu',
    'CNY': 'cin-yuani',
    'COP': 'kolombiya-pesosu',
    'CRC': 'kostarika-kolonu',
    'CZK': 'cek-korunasi',
    'DKK': 'danimarka-kronu',
    'DZD': 'cezayir-dinari',
    'EGP': 'misir-lirasi',
    'GEL': 'gurcistan-larisi',
    'HKD': 'hong-kong-dolari',
    'HUF': 'macar-forinti',
    'IDR': 'endonezya-rupiahi',
    'ILS': 'israil-sekeli',
    'INR': 'hindistan-rupisi',
    'IQD': 'irak-dinari',
    'IRR': 'iran-riyali',
    'ISK': 'izlanda-kronasi',
    'JOD': 'urdun-dinari',
    'KRW': 'guney-kore-wonu',
    'KWD': 'kuveyt-dinari',
    'KZT': 'kazak-tengesi',
    'LBP': 'lubnan-lirasi',
    'LKR': 'sri-lanka-rupisi',
    'LYD': 'libya-dinari',
    'MAD': 'fas-dirhemi',
    'MDL': 'moldovya-leusu',
    'MKD': 'makedon-dinari',
    'MXN': 'meksika-pesosu',
    'MYR': 'malezya-ringgiti',
    'NOK': 'norvec-kronu',
    'NZD': 'yeni-zelanda-dolari',
    'OMR': 'umman-riyali',
    'PEN': 'peru-inti',
    'PHP': 'filipinler-pesosu',
    'PKR': 'pakistan-rupisi',
    'PLN': 'polonya-zlotisi',
    'QAR': 'katar-riyali',
    'RON': 'romanya-leyi',
    'RSD': 'sirbistan-dinari',
    'RUB': 'rus-rublesi',
    'SAR': 'suudi-arabistan-riyali',
    'SEK': 'isvec-kronu',
    'SGD': 'singapur-dolari',
    'SYP': 'suriye-lirasi',
    'THB': 'tayland-bahti',
    'TND': 'tunus-dinari',
    'TWD': 'yeni-tayvan-dolari',
    'UAH': 'ukrayna-grivnasi',
    'UYU': 'uruguay-pesosu',
    'ZAR': 'guney-afrika-randi'
  };

  const code = currencyCode.toUpperCase();
  return currencyMap[code] || code.toLowerCase();
};

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
