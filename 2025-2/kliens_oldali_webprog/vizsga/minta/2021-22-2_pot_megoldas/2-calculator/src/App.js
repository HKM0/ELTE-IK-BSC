import './App.css';
import { ResultComponent } from './components/ResultComponent';
import { KeyPadComponent } from "./components/KeyPadComponent";
import { HistoryComponent } from './components/HistoryComponent';
import { useDispatch } from 'react-redux';
import { numberInput, operandInput, resultInput } from './state/calcSlice';
import { useEffect } from 'react';

const App = () => {

    const dispatch = useDispatch();

    function keydown(event) {
        const operands = ['+', '-', '*', '/'];
        if (event.key >= '1' && event.key <= '9') {
            dispatch(numberInput(parseInt(event.key)));
        } else if (operands.includes(event.key)) {
            dispatch(operandInput(event.key));
        } else if (event.key === '=') {
            dispatch(resultInput(event.key));
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keydown);
    }, []);

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
