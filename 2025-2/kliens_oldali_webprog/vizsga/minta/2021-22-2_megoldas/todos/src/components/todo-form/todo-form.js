import { useState, useContext } from "react";
import { TodosContext } from "../../todo-context";
import "./todo-form.css";

export const TodoForm = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [task, setTask] = useState("");

  const handleAddTodo = () => {
    if (task) {
      setTodos([
        ...todos,
        {
          id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0,
          label: task,
          checked: false,
        },
      ]);
      setTask("");
    }
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Új teendő"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Teendő hozzáadása
      </button>
    </div>
  );
};
