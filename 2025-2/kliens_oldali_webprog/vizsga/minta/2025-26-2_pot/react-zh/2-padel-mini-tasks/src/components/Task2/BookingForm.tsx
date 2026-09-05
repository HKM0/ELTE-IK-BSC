interface BookingFormProps {
  playerName: string;
  onPlayerNameChange: (value: string) => void;
}

const BookingForm = ({ playerName, onPlayerNameChange }: BookingFormProps) => {

  // Ezek csak azért vannak, hogy a TypeScript ne dobjon hibát.
  void playerName;
  void onPlayerNameChange;

  return (
    <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="player-name">Játékos neve</label>
      <input
        id="player-name"
        placeholder="Add meg a neved..."
      />
    </form>
  );
};

export default BookingForm;
