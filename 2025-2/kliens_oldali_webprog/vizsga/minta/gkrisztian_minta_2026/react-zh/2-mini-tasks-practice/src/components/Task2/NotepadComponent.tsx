import { useState } from "react";
import NoteForm from "./NoteForm";

interface Note {
  id: number;
  text: string;
}

const INITIAL_NOTES: Note[] = [
  { id: 1, text: "Bevásárolni tejfölt és kenyeret" },
  { id: 2, text: "Befizetni a villanyszámlát" },
];

const NotepadComponent = () => {
  //const notes = INITIAL_NOTES;
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);

  const addNote = (text: string) => {
    setNotes(prev => [...prev, {
      id: notes.length + 1,
      text // text: text
    }]);
  }

  return (
    <section className="page">
      <section className="hero">
        <h1>Task 2 – Notesz</h1>
        <p>Feljegyzések száma: {notes.length}</p>
      </section>
      <section className="panel">
        <NoteForm onAdd={addNote} />
        <ul className="task-list">
          {notes.map((note) => (
            <li key={note.id} className="task-item">
              <span>{note.text}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default NotepadComponent;
