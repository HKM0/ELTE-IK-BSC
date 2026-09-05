import './App.css'

function App() {
  return (
    <>
      <div className="jatekter">
        <h1>Shut the Box</h1>

        <div className="dobozok">
          <div className="doboz">1</div>
          <div className="doboz leforditva">2</div>
          <div className="doboz kivalasztva">3</div>
          <div className="doboz">...</div>
        </div>

        <div className="kockak-terulet">
            <div className="kocka" id="kocka1">-</div>
            <div className="kocka" id="kocka2">-</div>
        </div>

        <div className="allas">
          <p>Kockák összege: <span id="kockakOsszege">-</span></p>
        </div>

        <button id="dobasGomb">Kockadobás</button>
        <button id="vegeGomb">Játék vége</button>

        <div className="tortenet">
          <p>Eddigi eredmények: 1,2,3</p>
        </div>
    </div>
    </>
  )
}

export default App
