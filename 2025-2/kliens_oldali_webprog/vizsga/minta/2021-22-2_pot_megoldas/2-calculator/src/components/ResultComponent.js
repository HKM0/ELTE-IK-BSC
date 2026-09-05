import { useSelector } from "react-redux";
import { selectCurrentValue } from "../state/calcSlice";

export const ResultComponent = () => {

    const currentValue = useSelector(selectCurrentValue);

    return (
        <div className="result">
            <p>{currentValue}</p>
        </div>
    )

};
