import "./App.css";
import WishlistComponent from "./components/Task1/WishlistComponent";
import NotepadComponent from "./components/Task2/NotepadComponent";

function App() {
  return (
    <main className="app-shell">
      <WishlistComponent />
      <hr className="separator" />
      <NotepadComponent />
    </main>
  );
}

export default App;
