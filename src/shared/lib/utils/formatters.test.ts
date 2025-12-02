import { describe, it, expect } from 'vitest';
import { formatPrice, formatNumber, pluralize } from './formatters';

describe('formatters', () => {
  describe('formatPrice', () => {
    it('должен форматировать цену в USD', () => {
      expect(formatPrice(1000, 'usd')).toBe('1\u00A0000,00 $');
      expect(formatPrice(1234.56, 'usd')).toBe('1\u00A0234,56 $');
      expect(formatPrice(0, 'usd')).toBe('0,00 $');
    });

    it('должен использовать дефолтную, если не передна', () => {
      expect(formatPrice(1000)).toBe('1\u00A0000,00 $');
    });

    it('должен обрабатывать null', () => {
      expect(formatPrice(null)).toBe('Цена не указана');
      expect(formatPrice(null, 'usd')).toBe('Цена не указана');
    });

    it('должен обрабатывать undefined', () => {
      expect(formatPrice(undefined)).toBe('Цена не указана');
      expect(formatPrice(undefined, 'usd')).toBe('Цена не указана');
    });

    it('должен форматировать большие числа', () => {
      expect(formatPrice(1000000, 'usd')).toBe('1\u00A0000\u00A0000,00 $');
      expect(formatPrice(999999.99, 'usd')).toBe('999\u00A0999,99 $');
    });

    it('должен обрабатывать дробные числа', () => {
      expect(formatPrice(0.5, 'usd')).toBe('0,50 $');
      expect(formatPrice(0.01, 'usd')).toBe('0,01 $');
      expect(formatPrice(123.456, 'usd')).toBe('123,46 $');
    });

    it('должен быть case-insensitive для валюты', () => {
      expect(formatPrice(1000, 'USD')).toBe('1\u00A0000,00 $');
      expect(formatPrice(1000, 'UsD')).toBe('1\u00A0000,00 $');
    });
  });

  describe('formatNumber', () => {
    it('должен форматировать целые числа', () => {
      expect(formatNumber(1000)).toBe('1\u00A0000');
      expect(formatNumber(1000000)).toBe('1\u00A0000\u00A0000');
      expect(formatNumber(0)).toBe('0');
    });

    it('должен форматировать дробные числа', () => {
      expect(formatNumber(1234.56)).toBe('1\u00A0234,56');
      expect(formatNumber(0.5)).toBe('0,5');
    });

    it('должен обрабатывать отрицательные числа', () => {
      expect(formatNumber(-1000)).toBe('-1\u00A0000');
      expect(formatNumber(-1234.56)).toBe('-1\u00A0234,56');
    });

    it('должен обрабатывать очень большие числа', () => {
      expect(formatNumber(999999999)).toBe('999\u00A0999\u00A0999');
    });
  });

  describe('pluralize', () => {
    it('должен возвращать первую форму для 1', () => {
      expect(pluralize(1, ['товар', 'товара', 'товаров'])).toBe('товар');
      expect(pluralize(1, ['яблоко', 'яблока', 'яблок'])).toBe('яблоко');
    });

    it('должен возвращать первую форму для 21, 31, 101 и т.д.', () => {
      expect(pluralize(21, ['товар', 'товара', 'товаров'])).toBe('товар');
      expect(pluralize(31, ['товар', 'товара', 'товаров'])).toBe('товар');
      expect(pluralize(101, ['товар', 'товара', 'товаров'])).toBe('товар');
      expect(pluralize(1001, ['товар', 'товара', 'товаров'])).toBe('товар');
    });

    it('должен возвращать вторую форму для 2, 3, 4', () => {
      expect(pluralize(2, ['товар', 'товара', 'товаров'])).toBe('товара');
      expect(pluralize(3, ['товар', 'товара', 'товаров'])).toBe('товара');
      expect(pluralize(4, ['товар', 'товара', 'товаров'])).toBe('товара');
    });

    it('должен возвращать третью форму для 0', () => {
      expect(pluralize(0, ['товар', 'товара', 'товаров'])).toBe('товаров');
    });

    it('должен правильно обрабатывать числа 11-14 (исключения)', () => {
      expect(pluralize(11, ['товар', 'товара', 'товаров'])).toBe('товаров');
      expect(pluralize(12, ['товар', 'товара', 'товаров'])).toBe('товаров');
      expect(pluralize(13, ['товар', 'товара', 'товаров'])).toBe('товаров');
      expect(pluralize(14, ['товар', 'товара', 'товаров'])).toBe('товаров');
    });

    it('должен правильно обрабатывать числа 111-114, 211-214 и т.д.', () => {
      expect(pluralize(111, ['товар', 'товара', 'товаров'])).toBe('товаров');
      expect(pluralize(112, ['товар', 'товара', 'товаров'])).toBe('товаров');
      expect(pluralize(113, ['товар', 'товара', 'товаров'])).toBe('товаров');
      expect(pluralize(114, ['товар', 'товара', 'товаров'])).toBe('товаров');
    });

    it('должен работать с разными формами слов', () => {
      expect(pluralize(1, ['рубль', 'рубля', 'рублей'])).toBe('рубль');
      expect(pluralize(2, ['рубль', 'рубля', 'рублей'])).toBe('рубля');
      expect(pluralize(5, ['рубль', 'рубля', 'рублей'])).toBe('рублей');
    });
  });
});

