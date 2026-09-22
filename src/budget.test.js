import { describe, expect, it } from 'vitest';
import { calculateBudget } from './budget.js';

describe('calculateBudget', () => {
  it('calcula subtotal, desconto e total de um serviço', () => {
    expect(calculateBudget({ hourlyRate: 100, hours: 8, discountPercent: 10 }))
      .toEqual({ subtotal: 800, discountAmount: 80, total: 720 });
  });
  it('usa desconto zero quando omitido', () => {
    expect(calculateBudget({ hourlyRate: 75, hours: 2 })).toEqual({ subtotal: 150, discountAmount: 0, total: 150 });
  });
  it('aceita horas fracionadas', () => {
    expect(calculateBudget({ hourlyRate: 80, hours: 1.5 }).total).toBe(120);
  });
  it.each([{ hourlyRate: 0, hours: 8 }, { hourlyRate: 100, hours: 0 }])('aceita orçamento zerado: %o', (input) => {
    expect(calculateBudget(input).total).toBe(0);
  });
  it('aceita desconto de 100%', () => {
    expect(calculateBudget({ hourlyRate: 100, hours: 8, discountPercent: 100 }))
      .toEqual({ subtotal: 800, discountAmount: 800, total: 0 });
  });
  it('arredonda meio centavo para cima no subtotal', () => {
    expect(calculateBudget({ hourlyRate: 2.01, hours: 0.5 }).subtotal).toBe(1.01);
  });
  it('arredonda o desconto e mantém subtotal menos desconto igual ao total em centavos', () => {
    expect(calculateBudget({ hourlyRate: 19.99, hours: 1, discountPercent: 15 }))
      .toEqual({ subtotal: 19.99, discountAmount: 3, total: 16.99 });
  });
  it.each([
    { hourlyRate: -1 }, { hours: -1 }, { discountPercent: -1 },
    { discountPercent: 101 }, { hourlyRate: 1000001 }, { hours: 100001 },
  ])('rejeita valor fora do intervalo: %o', (invalid) => {
    expect(() => calculateBudget({ hourlyRate: 100, hours: 8, ...invalid })).toThrow(RangeError);
  });
  it.each([NaN, Infinity, -Infinity, '100', null, undefined])('rejeita entrada não numérica: %s', (invalid) => {
    expect(() => calculateBudget({ hourlyRate: invalid, hours: 8 })).toThrow(TypeError);
    expect(() => calculateBudget({ hourlyRate: 100, hours: invalid })).toThrow(TypeError);
  });
  it.each([NaN, Infinity, '10', null])('rejeita desconto inválido: %s', (discountPercent) => {
    expect(() => calculateBudget({ hourlyRate: 100, hours: 8, discountPercent })).toThrow(TypeError);
  });
});
