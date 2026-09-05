import { useState } from "react";


interface NoteFormProps {
  onAdd: (text: string) => void;
}

const NoteForm = ({  onAdd }: NoteFormProps) => {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //notes.push({ id: Date.now(), text });
    onAdd(text);
    setText("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={text}
        placeholder="Új feljegyzés..."
        onChange={(e) => setText(e.target.value)}
      />
      <button>Hozzáadás</button>
    </form>
  );
};

export default NoteForm;
