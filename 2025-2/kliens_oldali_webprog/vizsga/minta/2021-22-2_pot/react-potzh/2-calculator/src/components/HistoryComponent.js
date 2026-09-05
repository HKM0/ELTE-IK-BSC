export const HistoryComponent = () => {

    return (
        <div className="history-component">
            <p>Aktuális:</p>
            <table className="current history">
				<tbody>
					<tr>
						<td>5 + 5</td>
					</tr>
				</tbody>
            </table>

            <p>Eddigi számítások:</p>
            <table className="history">
				<tbody>
					<tr>
						<td>5 + 5 = 10</td>
					</tr>
					<tr>
						<td>2 X 3 = 6</td>
					</tr>
				</tbody>
            </table>
        </div>
    )

};
