import './App.css'
import ChoiceList from './view/ChoiceList'
import main from '/main.png';

function App() {

  return (
        <>
          <h1>ROCK PAPER SCISSORS LIZARD SPOCK</h1>
          <div className='container full-width'>
            <img src={main} className="main-logo"></img>
            <button>New Game</button>
          </div>
          <div className='container left'>
            <div className="border">
              <ChoiceList isPlayer={false}></ChoiceList>
              <h2>AI</h2>
              <button disabled={true}>AI</button>
            </div>
            <div className="border">
              <h2>PLAYER</h2>
              <ChoiceList isPlayer={true}></ChoiceList>
            </div>
            <button>New Game</button>
            <button>Change Mode</button>
          </div>
          <div className='container right'>
            <table className='history-table'>
              <thead>
                <tr>
                  <th>Winner</th>
                  <th>Player</th>
                  <th>AI</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>AI</td>
                    <td>rock</td>
                    <td>paper</td>
                  </tr>
                  <tr>
                    <td>Player</td>
                    <td>paper</td>
                    <td>rock</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </>
  )
}

export default App
