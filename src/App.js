import { useState, useRef } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [result, setResult] = useState("0");
  const [refResult, setRefResult] = useState("0");
  const [operator, setOperator] = useState(null);
  const [standby, setStandby] = useState(false);

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  const handleAddNumber = (e, type) => {
    let value;
    if (type == "input") {
      value = e.target.value.split("");
    } else {
      value = [...result.split(""), e];
    }
    if (standby) {
      value = value.slice(-1);
      setStandby(false);
    }

    if (value[0] === "0" && value.length > 1 && value[1] !== ".") {
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
    if (formatedNumber === "") {
      formatedNumber = "0";
    }
    setResult(formatedNumber);
  };

  const handleBackspace = () => {
    if (result.length < 2) {
      setResult("0");
    } else {
      setResult([...result].slice(0, -1).join(""));
    }
  };

  const handleClearResult = () => {
    setResult("0");
    setRefResult("0");
    setOperator(null);
  };

  const doOperation = (o) => {
    let operationResult;
    switch (o) {
      case "+":
        operationResult = Number(result) + Number(refResult);
        break;
      case "-":
        operationResult = Number(refResult) - Number(result);
        break;
      case "x":
        operationResult = Number(refResult) * Number(result);
        break;
      case "/":
        operationResult = Number(refResult) / Number(result);
        break;
    }

    setResult(String(operationResult));
    setRefResult(String(operationResult));
  };

  const handleOperation = (o) => {
    setRefResult(result);
    if (o == "=") {
      doOperation(operator);
      setOperator(null);
    } else {
      setOperator(o);
      setStandby(true);
      if (operator !== null) {
        if (operator === o) {
          doOperation(o);
        } else {
          doOperation(operator);
        }
      }
    }
  };

  return (
    <div className="App">
      <form className="form">
        <input
          type="text"
          className="input"
          value={result}
          onChange={(e) => {
            handleAddNumber(e, "input");
          }}
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
