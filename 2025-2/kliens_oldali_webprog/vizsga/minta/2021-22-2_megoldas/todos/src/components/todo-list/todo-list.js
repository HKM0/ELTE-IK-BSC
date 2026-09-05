import { useContext } from "react";
import { Checkbox } from "../checkbox/checkbox";
import { TodosContext } from "../../todo-context";
import "./todo-list.css";

export const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const handleDelete = (id) => {
    setTodos(todos.filter((el) => el.id !== id));
  };

  const toggleCheck = (id) => {
    setTodos(
      todos.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            checked: !el.checked,
          };
        }

        return el;
      })
    );
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Teendők:</span>
      {todos.length ? (
        <div className="todo-list-content">
          {todos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">Úgy látszik, ma nincs semmi dolgod :)</div>
      )}
    </div>
  );
};
