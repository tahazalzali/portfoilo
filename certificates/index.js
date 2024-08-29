import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Assuming you have some basic styling in index.css

const Calculator = () => {
    const [input, setInput] = useState(''); // For handling the input/display

    // Function to handle number and operator inputs
    const handleInput = (value) => {
        setInput(input + value);
    };

    // Function to calculate the result using eval (note: eval can be unsafe)
    const calculateResult = () => {
        try {
            setInput(eval(input).toString());
        } catch (error) {
            setInput('Error');
        }
    };

    // Function to clear the input
    const clearInput = () => {
        setInput('');
    };

    return (
        <div className="calculator">
            <div className="display">{input}</div>
            <div className="keypad">
                <button onClick={() => handleInput('1')}>1</button>
                <button onClick={() => handleInput('2')}>2</button>
                <button onClick={() => handleInput('3')}>3</button>
                <button onClick={() => handleInput('+')}>+</button>
                <button onClick={() => handleInput('4')}>4</button>
                <button onClick={() => handleInput('5')}>5</button>
                <button onClick={() => handleInput('6')}>6</button>
                <button onClick={() => handleInput('-')}>-</button>
                <button onClick={() => handleInput('7')}>7</button>
                <button onClick={() => handleInput('8')}>8</button>
                <button onClick={() => handleInput('9')}>9</button>
                <button onClick={() => handleInput('*')}>*</button>
                <button onClick={() => handleInput('0')}>0</button>
                <button onClick={clearInput}>C</button>
                <button onClick={() => handleInput('/')}>/</button>
                <button onClick={calculateResult}>=</button>
            </div>
        </div>
    );
};

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);
