import { useContext } from "react";
import { TodosContext } from "../../todo-context";
import "./todo-results.css";

export const TodoResults = () => {
  const calculateChecked = () => {
    // A kész teendők számának meghatározása
  };

  return (
    <div className="todo-results">
      Készen:
      {calculateChecked()}
    </div>
  );
};
