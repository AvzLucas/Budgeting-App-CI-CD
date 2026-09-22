/**
 * Calcula em centavos: arredonda o subtotal, depois o desconto.
 * Os limites mantêm os resultados dentro de uma faixa numérica segura.
 */
export function calculateBudget({ hourlyRate, hours, discountPercent = 0 }) {
  for (const value of [hourlyRate, hours, discountPercent]) {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new TypeError('Preencha todos os campos com números válidos.');
    }
  }
  if (hourlyRate < 0 || hourlyRate > 1_000_000) {
    throw new RangeError('O valor por hora deve estar entre R$ 0 e R$ 1.000.000.');
  }
  if (hours < 0 || hours > 100_000) {
    throw new RangeError('A quantidade de horas deve estar entre 0 e 100.000.');
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new RangeError('O desconto deve estar entre 0% e 100%.');
  }

  const round = (value) => Math.round(value + Number.EPSILON * Math.abs(value));
  const subtotalCents = round(hourlyRate * hours * 100);
  const discountCents = round(subtotalCents * discountPercent / 100);

  return {
    subtotal: subtotalCents / 100,
    discountAmount: discountCents / 100,
    total: (subtotalCents - discountCents) / 100,
  };
}
