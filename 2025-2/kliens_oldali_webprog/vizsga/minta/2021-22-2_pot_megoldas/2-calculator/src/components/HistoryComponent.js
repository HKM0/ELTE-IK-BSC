import { useSelector } from "react-redux";
import { selectCurrentExpression, selectHistory } from "../state/calcSlice";

export const HistoryComponent = () => {

    const currentExpression = useSelector(selectCurrentExpression);
    const history = useSelector(selectHistory);

    return (
        <div className="history-component">
            <p>Aktuális:</p>
            <table className="current history">
                <tbody>
                    <tr>
                        <td>{currentExpression}</td>
                    </tr>
                </tbody>
            </table>

            <p>Eddigi számítások:</p>
            <table className="history">
                <tbody>
                    {history.map((value, i) => (
                        <tr key={i}>
                            <td>{value} = {eval(value)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

};
