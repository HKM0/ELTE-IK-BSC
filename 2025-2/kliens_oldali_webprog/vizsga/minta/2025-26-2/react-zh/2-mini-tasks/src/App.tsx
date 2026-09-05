import "./App.css";
import Task1Component from "./components/Task1/Task1Component";
import Task2Component from "./components/Task2/Task2Component";

function App() {
  return (
    <main className="app-shell">
      <Task1Component />
      <hr className="separator" />
      <Task2Component />
    </main>
  );
}

export default App;
