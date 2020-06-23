import React from "react";
import useSetState from "./useSetState";
import "./App.css";

function App() {
  const [state, setState] = useSetState({ name: "Ola", age: 12 });

  const printName = () => {
    setState({ name: "Karo" });
  };

  const printAge = () => {
    setState((state) => ({ age: state.age + 17 }));
  };

  const printSentence = () => {
    setState({ name: "Woman" }, () => {
      setState({ age: 18 });
    });
  };

  return (
    <div className="App">
      <h2>About me!</h2>

      <p>My name: {state.name}</p>
      <button onClick={printName}>Show my real name!</button>

      <p>My age: {state.age}</p>
      <button onClick={printAge}>Show my real age!</button>

      <p>{state.name} always hide her name, so think she is {state.age}!</p>
      <button onClick={printSentence}>Sad true!</button>
    </div>
  );
}

export default App;
