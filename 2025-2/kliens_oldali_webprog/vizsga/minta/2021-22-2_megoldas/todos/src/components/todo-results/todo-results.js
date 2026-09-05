import { useContext } from "react";
import { TodosContext } from "../../todo-context";
import "./todo-results.css";

export const TodoResults = () => {
  const { todos } = useContext(TodosContext);

  const calculateChecked = () => todos.filter((el) => el.checked).length;

  return (
    <div className="todo-results">
      Készen:
      {calculateChecked()}
    </div>
  );
};
