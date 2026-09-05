export const KeyPadComponent = () => (

    <div className="button">

        <button name="1" onClick={() => console.log('1')}>1</button>
        <button name="2" onClick={() => console.log('2')}>2</button>
        <button name="3" onClick={() => console.log('3')}>3</button>
        <button name="+" onClick={() => console.log('+')}>+</button><br />


        <button name="4" onClick={() => console.log('4')}>4</button>
        <button name="5" onClick={() => console.log('5')}>5</button>
        <button name="6" onClick={() => console.log('6')}>6</button>
        <button name="-" onClick={() => console.log('-')}>-</button><br />

        <button name="7" onClick={() => console.log('7')}>7</button>
        <button name="8" onClick={() => console.log('8')}>8</button>
        <button name="9" onClick={() => console.log('9')}>9</button>
        <button name="*" onClick={() => console.log('*')}>x</button><br />


        <button name="">&nbsp;</button>
        <button name="0" onClick={() => console.log('0')}>0</button>
        <button name="=" onClick={() => console.log('=')}>=</button>
        <button name="/" onClick={() => console.log('/')}>÷</button><br />

    </div>

);
