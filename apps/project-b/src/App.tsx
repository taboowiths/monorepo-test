import { useState } from "react";
import { useCounter, useToggle } from "@test/react-hooks";
import { Button, Input } from "@test/ui";
import "./App.css";

function App() {
  const { count, increment, decrement, reset } = useCounter(2);
  const { value: isVisible, toggle } = useToggle(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="App">
      <h1>Project B - Test Application (beta)</h1>

      <div className="card">
        <h2>Counter Hook Test</h2>
        <p>Count: {count}</p>
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement} variant="secondary">
          Decrement
        </Button>
        <Button onClick={reset}>Reset</Button>
      </div>

      <div className="card">
        <h2>Toggle Hook Test</h2>
        <Button onClick={toggle}>{isVisible ? "Hide" : "Show"} Content</Button>
        {isVisible && <p>This content is toggled!</p>}
      </div>

      <div className="card">
        <h2>UI Components Test</h2>
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="Type something..."
        />
        <p>You typed: {inputValue}</p>
      </div>
    </div>
  );
}

export default App;
