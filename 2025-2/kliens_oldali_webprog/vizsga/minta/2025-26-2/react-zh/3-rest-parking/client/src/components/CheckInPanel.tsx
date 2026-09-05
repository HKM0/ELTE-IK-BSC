import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { getFloorsFromSpots } from '../utils/floors';
import { getFreeOnFloor, randomCheckInForm } from '../utils/randomCheckIn';
import { toDatetimeLocalValue } from '../utils/datetimeLocal';
import type { CheckInFormState, FormErrors, Spot } from '../entities';
type CheckInPanelProps = {
  spots: Spot[];
};

const emptyForm = (): CheckInFormState => ({
  floor: '',
  place: '',
  plate: '',
  parkedAt: toDatetimeLocalValue(),
  notes: '',
});

const CheckInPanel = ({ spots }: CheckInPanelProps) => {
  const floors = getFloorsFromSpots(spots);
  const [errors, setErrors] = useState<FormErrors>({});
  const [form, setForm] = useState<CheckInFormState>(emptyForm);
  const hasInitialized = useRef(false);
  const resetFormAfterCheckIn = useRef(false);
  const isLoading = false;

  
  useEffect(() => {
    if (spots.length === 0 || hasInitialized.current) return;
    hasInitialized.current = true;
    setForm(randomCheckInForm(spots));
  }, [spots]);

  useEffect(() => {
    if (!resetFormAfterCheckIn.current || spots.length === 0) return;
    resetFormAfterCheckIn.current = false;
    setForm(randomCheckInForm(spots));
  }, [spots]);

  const freeOnFloor = form.floor ? getFreeOnFloor(spots, form.floor) : [];

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value } as CheckInFormState;
      if (name === 'floor') next.place = '';
      return next;
    });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const next: FormErrors = {};
    if (!form.floor) next.floor = 'Válassz emeletet';
    if (!form.place) next.place = 'Válassz helyet';
    if (!form.plate.trim()) next.plate = 'Rendszám kötelező';
    if (!form.parkedAt) next.parkedAt = 'Időpont kötelező';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // segítség: const parkedAt = new Date().toISOString();
    // TODO: A foglalás elindítását a szerverre küldve itt indítsd el

    resetFormAfterCheckIn.current = true;
    setForm(randomCheckInForm(spots));
  };

  const anyFree = spots.some((s) => s.status === 'free');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <label className="form-control w-full">
            <span className="label-text text-slate-600">Emelet</span>
            <select
              name="floor"
              className={`select select-bordered select-sm w-full ${errors.floor ? 'select-error' : ''}`}
              value={form.floor}
              onChange={onChange}
            >
              <option value="">—</option>
              {floors.map((f) => (
                <option key={f} value={String(f)}>
                  {f}. emelet
                </option>
              ))}
            </select>
            {errors.floor && (
              <span className="mt-0.5 text-xs text-error">{errors.floor}</span>
            )}
          </label>

          <label className="form-control w-full">
            <span className="label-text text-slate-600">Hely</span>
            <select
              name="place"
              className={`select select-bordered select-sm w-full ${errors.place ? 'select-error' : ''}`}
              value={form.place}
              onChange={onChange}
              disabled={!form.floor}
            >
              <option value="">—</option>
              {freeOnFloor.map((s) => (
                <option key={s.id} value={String(s.id)}>
                  {s.code}
                </option>
              ))}
            </select>
            {errors.place && (
              <span className="mt-0.5 text-xs text-error">{errors.place}</span>
            )}
          </label>
        </div>

        {form.floor && freeOnFloor.length === 0 && (
          <p className="text-xs text-warning">Ezen az emeleten nincs szabad hely.</p>
        )}

        <label className="form-control w-full">
          <span className="label-text text-slate-600">Rendszám</span>
          <input
            name="plate"
            className={`input input-bordered input-sm font-mono uppercase ${errors.plate ? 'input-error' : ''}`}
            placeholder="ABC-123"
            value={form.plate}
            onChange={onChange}
          />
          {errors.plate && (
            <span className="mt-0.5 text-xs text-error">{errors.plate}</span>
          )}
        </label>

        <label className="form-control w-full">
          <span className="label-text text-slate-600">Érkezés</span>
          <input
            type="datetime-local"
            name="parkedAt"
            className={`input input-bordered input-sm w-full ${errors.parkedAt ? 'input-error' : ''}`}
            value={form.parkedAt}
            onChange={onChange}
          />
        </label>

        <label className="form-control w-full">
          <span className="label-text text-slate-600">Megjegyzés</span>
          <input
            name="notes"
            className="input input-bordered input-sm w-full"
            placeholder="Opcionális"
            value={form.notes}
            onChange={onChange}
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary btn-sm mt-1"
          disabled={isLoading || !anyFree}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            'Foglalás rögzítése'
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckInPanel;
