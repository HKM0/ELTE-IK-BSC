import TaskForm from "./TaskForm";

const INITIAL_TASKS = [
  { id: 1, title: "Felkészülni a zh-ra", completed: true },
  { id: 2, title: "Rendesen beosztani a vizsgáimat", completed: false },
];

const Task2Component = () => {
  const tasks = INITIAL_TASKS;

  return (
    <section className="page">
      <section className="hero">
        <h1>Task 2 - Tanulás Tervező</h1>
        <p>Hátralevő feladatok: {tasks.length}</p>
      </section>

      <section className="panel">
        <TaskForm tasks={tasks} />

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Task2Component;
