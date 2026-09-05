import { useState } from "react";
import { TodoForm } from "./components/todo-form/todo-form";
import { TodoList } from "./components/todo-list/todo-list";
import { TodoResults } from "./components/todo-results/todo-results";
import { TodosContext } from "./todo-context";
import "./index.css";

const todosTemplate = [
  {
    id: 0,
    label: "Az összes teendő megjelenítése",
    checked: false,
  },
  {
    id: 2,
    label: "Új teendő hozzáadása",
    checked: false,
  },
  {
    id: 3,
    label: "Egy teendő elvégzetté/aktívvá tétele",
    checked: false,
  },
  {
    id: 4,
    label: "Egy teendő törlése",
    checked: false,
  },
  {
    id: 5,
    label: "A kész teendő számának meghatározása",
    checked: false,
  },
];

export const App = () => {
  const [todos, setTodos] = useState(todosTemplate);

  return (
    <div className="root">
      <TodosContext.Provider value={{ todos, setTodos }}>
        <TodoList />
        <TodoResults />
        <TodoForm />
      </TodosContext.Provider>
    </div>
  );
};
