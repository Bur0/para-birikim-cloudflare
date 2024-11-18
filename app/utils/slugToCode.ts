export function slugToCode(code: string) {
  let slug = code.toLowerCase();

  // Para birimlerini Türkçe karşılıklarına çevir
  const currencyWords = slug.split(' ');
  const translatedWords = currencyWords.map((word) => {
    switch (word) {
      // Major currencies
      case 'dolar':
        return 'USD';
      case 'euro':
        return 'EUR';
      case 'sterlin':
        return 'GBP';
      case 'japon-yeni':
        return 'JPY';
      case 'avustralya-dolari':
        return 'AUD';
      case 'kanada-dolari':
        return 'CAD';
      case 'frank':
        return 'CHF';
      case 'bae-dirhemi':
        return 'AED';
      case 'arnavutluk-leki':
        return 'ALL';
      case 'arjantin-pesosu':
        return 'ARS';
      case 'azerbaycan-manati':
        return 'AZN';
      case 'bosna-hersek-marki':
        return 'BAM';
      case 'bulgar-levasi':
        return 'BGN';
      case 'bahreyn-dinari':
        return 'BHD';
      case 'brezilya-reali':
        return 'BRL';
      case 'sili-pesosu':
        return 'CLP';
      case 'cin-yuani':
        return 'CNY';
      case 'kolombiya-pesosu':
        return 'COP';
      case 'kostarika-kolonu':
        return 'CRC';
      case 'cek-korunasi':
        return 'CZK';
      case 'danimarka-kronu':
        return 'DKK';
      case 'cezayir-dinari':
        return 'DZD';
      case 'misir-lirasi':
        return 'EGP';
      case 'gurcistan-larisi':
        return 'GEL';
      case 'hong-kong-dolari':
        return 'HKD';
      case 'macar-forinti':
        return 'HUF';
      case 'endonezya-rupiahi':
        return 'IDR';
      case 'israil-sekeli':
        return 'ILS';
      case 'hindistan-rupisi':
        return 'INR';
      case 'irak-dinari':
        return 'IQD';
      case 'iran-riyali':
        return 'IRR';
      case 'izlanda-kronasi':
        return 'ISK';
      case 'urdun-dinari':
        return 'JOD';
      case 'guney-kore-wonu':
        return 'KRW';
      case 'kuveyt-dinari':
        return 'KWD';
      case 'kazak-tengesi':
        return 'KZT';
      case 'lubnan-lirasi':
        return 'LBP';
      case 'sri-lanka-rupisi':
        return 'LKR';
      case 'libya-dinari':
        return 'LYD';
      case 'fas-dirhemi':
        return 'MAD';
      case 'moldovya-leusu':
        return 'MDL';
      case 'makedon-dinari':
        return 'MKD';
      case 'meksika-pesosu':
        return 'MXN';
      case 'malezya-ringgiti':
        return 'MYR';
      case 'norvec-kronu':
        return 'NOK';
      case 'yeni-zelanda-dolari':
        return 'NZD';
      case 'umman-riyali':
        return 'OMR';
      case 'peru-inti':
        return 'PEN';
      case 'filipinler-pesosu':
        return 'PHP';
      case 'pakistan-rupisi':
        return 'PKR';
      case 'polonya-zlotisi':
        return 'PLN';
      case 'katar-riyali':
        return 'QAR';
      case 'romanya-leyi':
        return 'RON';
      case 'sirbistan-dinari':
        return 'RSD';
      case 'rus-rublesi':
        return 'RUB';
      case 'suudi-arabistan-riyali':
        return 'SAR';
      case 'isvec-kronu':
        return 'SEK';
      case 'singapur-dolari':
        return 'SGD';
      case 'suriye-lirasi':
        return 'SYP';
      case 'tayland-bahti':
        return 'THB';
      case 'tunus-dinari':
        return 'TND';
      case 'yeni-tayvan-dolari':
        return 'TWD';
      case 'ukrayna-grivnasi':
        return 'UAH';
      case 'uruguay-pesosu':
        return 'UYU';
      case 'guney-afrika-randi':
        return 'ZAR';
      default:
        return word;
    }
  });

  // Kelimeleri birleştir ve boşlukları tire ile değiştir
  slug = translatedWords.join(' ');
  slug = slug.replace(/ /g, '-');

  return slug;
}
