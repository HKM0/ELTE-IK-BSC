import type { Court } from "../../types";

interface CourtCardProps {
  court: Court;
  canBook: boolean;
  onBook: (id: number) => void;
}

const CourtCard = ({ court, canBook, onBook }: CourtCardProps) => {
  const isBooked = court.bookedBy !== null;

  return (
    <div className={`court-card ${isBooked ? "court-card--booked" : ""}`}>
      <div className="court-card-frame">
        <div className="court-card-surface">
          <span className="court-card-net" />
        </div>
      </div>

      <h2>{court.name}</h2>

      <span className={`court-badge ${isBooked ? "court-badge--busy" : ""}`}>
        {isBooked ? `Foglalva: ${court.bookedBy}` : "Szabad"}
      </span>

      <button
        type="button"
        className="padel-btn"
        disabled={isBooked || !canBook}
        onClick={() => onBook(court.id)}
      >
        {isBooked ? "Nem elérhető" : "Foglalás"}
      </button>
    </div>
  );
};

export default CourtCard;
