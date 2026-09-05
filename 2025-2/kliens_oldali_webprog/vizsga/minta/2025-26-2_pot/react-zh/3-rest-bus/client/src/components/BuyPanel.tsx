import { useState, type ChangeEvent } from 'react';
import type { BuyTicketFormState, FormErrors } from '../entities';
import { toDatetimeLocalValue } from '../utils/datetimeLocal';

const emptyForm = (): BuyTicketFormState => ({
  buyerName:   '',
  type:        'single',
  purchasedAt: toDatetimeLocalValue(),
});

export default function BuyPanel() {
  const [form, setForm] = useState<BuyTicketFormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const isLoading = false;

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const next: FormErrors = {};
    if (!form.buyerName.trim()) next.buyerName = 'Név kötelező';
    if (!form.type)             next.type       = 'Válassz típust';
    if (!form.purchasedAt)      next.purchasedAt = 'Időpont kötelező';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!validate()) return;
    // TODO: küldd el a vásárlást a szerverre (POST /tickets)
  }

  return (
    <div className="panel">
      <h2>Jegy vásárlása</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="buyerName">Utas neve</label>
          <input
            id="buyerName"
            name="buyerName"
            placeholder="pl. Kiss Péter"
            value={form.buyerName}
            onChange={onChange}
            className={errors.buyerName ? 'input-error' : ''}
          />
          {errors.buyerName && <span className="field-error">{errors.buyerName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="type">Jegytípus</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={onChange}
            className={errors.type ? 'input-error' : ''}
          >
            <option value="single">Egyszeri (90 perc)</option>
            <option value="24h">24 órás</option>
            <option value="72h">72 órás</option>
          </select>
          {errors.type && <span className="field-error">{errors.type}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="purchasedAt">Vásárlás időpontja</label>
          <input
            id="purchasedAt"
            type="datetime-local"
            name="purchasedAt"
            value={form.purchasedAt}
            onChange={onChange}
            className={errors.purchasedAt ? 'input-error' : ''}
          />
          {errors.purchasedAt && <span className="field-error">{errors.purchasedAt}</span>}
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
          {isLoading ? 'Mentés...' : 'Jegy vásárlása'}
        </button>
      </form>
    </div>
  );
}
