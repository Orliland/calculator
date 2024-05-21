import { useState, useRef } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState(null);
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const handleAddNumber = (children) => {
    let value = inputRef.current.value.split("");
    if (value[0] === "0") {
      value = value.slice(1);
    }
    const inputValue = [...value, children].join("");
    if (children === ".") {
      if (!value.includes(".")) {
        inputRef.current.value = inputValue;
      }
    } else {
      inputRef.current.value = inputValue;
    }
  };

  const handleBackspace = () => {
    let inputValue = [...inputRef.current.value].slice(0, -1);
    inputRef.current.value = inputValue.join("");
  };

  const handleClearResult = () => {
    inputRef.current.value = "0";
    setResult(0);
    setOperator(null);
  };

  const handleOperation = (o) => {
    if (o === "=") {
      switch (operator) {
        case "/":
          resultRef.current =
            Number(resultRef.current) / Number(inputRef.current.value);
          break;
        case "x":
          resultRef.current =
            Number(resultRef.current) * Number(inputRef.current.value);
          break;
        case "-":
          resultRef.current =
            Number(resultRef.current) - Number(inputRef.current.value);
          break;
        case "+":
          resultRef.current =
            Number(resultRef.current) + Number(inputRef.current.value);
          break;
      }
      inputRef.current.value = resultRef.current;
      setResult(Number(resultRef.current));
      setOperator(null);
    } else {
      resultRef.current = Number(inputRef.current.value);
      inputRef.current.value = "0";

      if (operator === o) {
        handleOperation("=");
      } else {
        setOperator(o);
      }
    }
  };

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  const handleInputNumber = (e) => {
    e.preventDefault();
    let value = inputRef.current.value.split("");
    if (value[0] === "0" && value[1] !== ".") {
      value = value.slice(1);
    }
    let formatedNumber = "";
    value.map((item) => {
      if (numbers.includes(item)) {
        if (item === ".") {
          if (!formatedNumber.includes(".")) {
            formatedNumber += item;
          }
        } else {
          formatedNumber += item;
        }
      }
    });
    inputRef.current.value = formatedNumber;
  };

  return (
    <div className="App">
      <form className="form">
        <span className="result">{resultRef.current}</span>
        <input
          type="text"
          className="input"
          ref={inputRef}
          defaultValue={0}
          onChange={handleInputNumber}
        />

        <div className="calc">
          <Button onClick={handleBackspace} className="btn--secondary">
            =>
          </Button>
          <Button className="btn--secondary" onClick={handleClearResult}>
            clear
          </Button>
          <Button
            className="btn--primary"
            onClick={handleOperation}
            operator={operator}
          >
            /
          </Button>
          <Button
            className="btn--primary"
            onClick={handleOperation}
            operator={operator}
          >
            x
          </Button>

          <Button onClick={handleAddNumber}>7</Button>
          <Button onClick={handleAddNumber}>8</Button>
          <Button onClick={handleAddNumber}>9</Button>
          <Button
            className="btn--primary"
            onClick={handleOperation}
            operator={operator}
          >
            -
          </Button>

          <Button onClick={handleAddNumber}>4</Button>
          <Button onClick={handleAddNumber}>5</Button>
          <Button onClick={handleAddNumber}>6</Button>
          <Button
            className="btn--primary"
            onClick={handleOperation}
            operator={operator}
          >
            +
          </Button>

          <Button onClick={handleAddNumber}>1</Button>
          <Button onClick={handleAddNumber}>2</Button>
          <Button onClick={handleAddNumber}>3</Button>
          <Button className="btn--primary row2" onClick={handleOperation}>
            =
          </Button>

          <Button onClick={handleAddNumber} className="col2">
            0
          </Button>
          <Button onClick={handleAddNumber}>.</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
