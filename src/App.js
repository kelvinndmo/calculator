import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  state = {
    previousText: "",
    currentText: "",
    currentValue: "",
    previousValue: "",
    operation: ""
  };

  appendNumber = e => {
    let number = e.target.value;
    const { currentValue } = this.state;
    if (number === "." && currentValue.includes(".")) return;
    this.setState({
      currentValue: currentValue.toString() + number.toString()
    });
  };

  chooseOperation = e => {
    const { currentValue, previousValue } = this.state;
    let operation = e.target.value;
    if (currentValue === "") return;
    if (previousValue !== "") {
      return this.calculate();
    }

    this.setState({ operation });
    this.setState({ previousValue: currentValue });
    this.setState({ currentValue: "" });
  };

  delete = () => {
    const { currentValue } = this.state;
    const newValue = currentValue.toString().slice(0, -1);
    this.setState({ currentValue: newValue });
  };

  clear = () => {
    this.setState({ currentValue: "" });
    this.setState({ previousValue: "" });
    this.setState({ operation: "" });
  };

  updateDisplay = () => {
    const { previousValue, operation } = this.state;
    if (operation !== null) {
      this.setState({ previousText: previousValue });
    }
  };

  getDisplayNumber = number => {
    const stringNumber = number.toString();
    const intergerDit = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let IntergerValue;
    if (isNaN(intergerDit)) {
      IntergerValue = "";
    } else {
      IntergerValue = intergerDit.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }

    if (decimalDigits != null) {
      return `${IntergerValue}.${decimalDigits}`;
    } else {
      return IntergerValue;
    }
  };

  calculate = () => {
    const { operation, previousValue, currentValue } = this.state;
    let computation;
    const previous = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(previous) || isNaN(current)) return;
    switch (operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "*":
        computation = previous * current;
        break;
      case "/":
        computation = previous / current;
        break;
      default:
        computation = "";
    }

    this.setState({ currentValue: computation });
    this.setState({ operation: "" });
    this.setState({ previousValue: "" });
  };

  equalsSign = () => {
    this.calculate();
    this.updateDisplay();
  };

  render() {
    const { currentValue, previousValue, operation } = this.state;
    return (
      <div className="calc">
        <div className="calculator-grid">
          <div className="output">
            <div className="previous-operand">{`${this.getDisplayNumber(
              previousValue
            )} ${operation}`}</div>
            <div className="current-operand">{currentValue}</div>
          </div>
          <button onClick={this.clear} className="span-two">
            AC
          </button>
          <button onClick={this.delete}>DEL</button>
          <button onClick={this.chooseOperation} value="/">
            /
          </button>
          <button value={1} onClick={this.appendNumber}>
            1
          </button>
          <button value={2} onClick={this.appendNumber}>
            2
          </button>
          <button value={3} onClick={this.appendNumber}>
            3
          </button>
          <button onClick={this.chooseOperation} value={"*"}>
            *
          </button>
          <button value={4} onClick={this.appendNumber}>
            4
          </button>
          <button value={5} onClick={this.appendNumber}>
            5
          </button>
          <button value={6} onClick={this.appendNumber}>
            6
          </button>
          <button onClick={this.chooseOperation} value={"+"}>
            +
          </button>
          <button value={7} onClick={this.appendNumber}>
            7
          </button>
          <button value={8} onClick={this.appendNumber}>
            8
          </button>
          <button value={9} onClick={this.appendNumber}>
            9
          </button>
          <button onClick={this.chooseOperation} value={"-"}>
            -
          </button>
          <button value={"."} onClick={this.appendNumber}>
            .
          </button>
          <button value={0} onClick={this.appendNumber}>
            0
          </button>
          <button onClick={this.equalsSign} className="span-two">
            =
          </button>
        </div>
      </div>
    );
  }
}

export default App;
