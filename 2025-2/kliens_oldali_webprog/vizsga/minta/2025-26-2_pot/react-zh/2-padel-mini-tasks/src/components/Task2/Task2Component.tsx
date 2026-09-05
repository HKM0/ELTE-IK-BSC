import KioskLayout from "../KioskLayout";
import BookingForm from "./BookingForm";
import CourtCard from "./CourtCard";
import type { Court } from "../../types";

const INITIAL_COURTS: Court[] = [
  { id: 1, name: "Pálya 1", bookedBy: null },
  { id: 2, name: "Pálya 2", bookedBy: "Anna" },
  { id: 3, name: "Pálya 3", bookedBy: null },
];

const Task2Component = () => {
  let courts = INITIAL_COURTS;
  let playerName = "Panna";
  
  
  const handleBook = (id: number) => {
    const court = courts.find((item) => item.id === id);
    if (court) {
      court.bookedBy = playerName.trim();
    }
  };

  const freeCount = courts.filter((court) => court.bookedBy === null).length;
  const canBook = playerName.trim().length > 0;

  return (
    <KioskLayout
      title="Task 2 – Pályafoglaló"
      screen={`Szabad pályák: ${freeCount} / ${courts.length}`}
      bodyClassName="padel-kiosk-body--booking"
    >
      <BookingForm
        playerName={playerName}
        onPlayerNameChange={(name) => playerName = name}
      />

      <section className="court-grid">
        {courts.map((court) => (
          <CourtCard
            key={court.id}
            court={court}
            canBook={canBook}
            onBook={handleBook}
          />
        ))}
      </section>
    </KioskLayout>
  );
};

export default Task2Component;
