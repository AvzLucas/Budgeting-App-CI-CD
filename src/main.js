import './style.css';
import { calculateBudget } from './budget.js';

const form = document.querySelector('#budget-form');
const error = document.querySelector('#error');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const fields = { subtotal: '#subtotal', discountAmount: '#discount-amount', total: '#total' };

function clearResult() {
  for (const selector of Object.values(fields)) {
    document.querySelector(selector).textContent = '—';
  }
}

function updateBudget() {
  error.hidden = true;
  try {
    const result = calculateBudget({
      hourlyRate: form.elements.hourlyRate.valueAsNumber,
      hours: form.elements.hours.valueAsNumber,
      discountPercent: form.elements.discountPercent.valueAsNumber,
    });
    for (const [key, selector] of Object.entries(fields)) {
      document.querySelector(selector).textContent = currency.format(result[key]);
    }
  } catch (cause) {
    clearResult();
    error.textContent = cause.message;
    error.hidden = false;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateBudget();
});
form.addEventListener('input', () => {
  clearResult();
  error.hidden = true;
});
updateBudget();
