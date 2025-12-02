export function formatPrice(price: number | null | undefined, currency: string = 'usd'): string {
  if (price === null || price === undefined) {
    return 'Цена не указана';
  }

  const currencySymbols: Record<string, string> = {
    usd: '$'
    // тут другие валюты
  };

  const symbol = currencySymbols[currency.toLowerCase()] || currency.toUpperCase();
  
  return `${price.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${symbol}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('ru-RU');
}

/**
 * @param count - число для склонения
 * @param forms - массив из трех форм: [1, 2-4, 5+]
 * @returns правильная форма слова
 */
export function pluralize(count: number, forms: [string, string, string]): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return forms[0];
  }

  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
    return forms[1];
  }

  return forms[2];
}

