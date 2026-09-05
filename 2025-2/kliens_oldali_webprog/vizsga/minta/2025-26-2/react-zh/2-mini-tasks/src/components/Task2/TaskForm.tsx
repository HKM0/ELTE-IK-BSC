import { useState } from "react";
import type { Task } from "../../types";

interface TaskFormProps {
  tasks: Task[];
}

const TaskForm = ({ tasks }: TaskFormProps) => {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    tasks.push({
      id: Date.now(),
      title: title,
      completed: false,
    });

    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        placeholder="Írj be egy új feladatot..."
        onChange={(e) => setTitle(e.target.value)}
      />

      <button>Feladat hozzáadása</button>
    </form>
  );
};

export default TaskForm;
