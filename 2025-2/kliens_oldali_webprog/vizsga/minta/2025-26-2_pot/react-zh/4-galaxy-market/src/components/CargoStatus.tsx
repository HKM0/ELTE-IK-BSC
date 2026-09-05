export default function CargoStatus() {
  const isFull = false;

  return (
    <div className={isFull ? 'cargo-status cargo-status--full' : 'cargo-status'}>
      Raktár kihasználtság: 0 / 50 egység
      {isFull && <strong className="cargo-status__alert">[RAKTÁR MEGTELT!]</strong>}
    </div>
  );
}
