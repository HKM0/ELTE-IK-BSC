import './App.css';
import { ResultComponent } from './components/ResultComponent';
import { KeyPadComponent } from "./components/KeyPadComponent";
import { HistoryComponent } from './components/HistoryComponent';

const App = () => {

    return (
        <div>
            <div className="calculator-body">
                <h1>Számológép</h1>
                <ResultComponent />
                <KeyPadComponent />
                <HistoryComponent />
            </div>
        </div>
    );

};

export default App;
