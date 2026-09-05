import { useDispatch, useSelector } from "react-redux";
import { numberInput, operandInput, resultInput } from "../state/calcSlice";
import { selectCurrentValue } from "../state/calcSlice";


export const KeyPadComponent = () => {

    const dispatch = useDispatch();
    const currentValue = useSelector(selectCurrentValue);

    return (
        <div className="button">
            
            <button name="1" onClick={() => dispatch(numberInput(1))}>1</button>
            <button name="2" onClick={() => dispatch(numberInput(2))}>2</button>
            <button name="3" onClick={() => dispatch(numberInput(3))}>3</button>
            <button name="+" onClick={() => dispatch(operandInput('+'))}>+</button><br />


            <button name="4" onClick={() => dispatch(numberInput(4))}>4</button>
            <button name="5" onClick={() => dispatch(numberInput(5))}>5</button>
            <button name="6" onClick={() => dispatch(numberInput(6))}>6</button>
            <button name="-" onClick={() => dispatch(operandInput('-'))}>-</button><br />

            <button name="7" onClick={() => dispatch(numberInput(7))}>7</button>
            <button name="8" onClick={() => dispatch(numberInput(8))}>8</button>
            <button name="9" onClick={() => dispatch(numberInput(9))}>9</button>
            <button name="*" onClick={() => dispatch(operandInput('*'))}>x</button><br />


            <button name="">&nbsp;</button>
            <button name="0" onClick={() => dispatch(numberInput(0))}>0</button>
            <button name="=" onClick={() => dispatch(resultInput())}>=</button>
            <button name="/" onClick={() => dispatch(operandInput('/'))}>÷</button><br />

        </div>
    );

};
