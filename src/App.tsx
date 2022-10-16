import React, { useState } from "react";
import "./App.css";

function is_input_valid(value: string): boolean {
  return value.search("^[a-z]{0,8}$") >= 0;
}

function App() {
  const [words, setWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const listItems = words.map((word, index) => {
    return <li key={index}>{word}</li>;
  });
  return (
    <div>
      <p>There are {words.length} words in the list</p>
      <input
        type="text"
        value={input}
        onInput={(e) => {
          const value = e.currentTarget.value.toLowerCase();
          if (is_input_valid(value)) {
            setInput(value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setWords([...words, input]);
            setInput("");
          }
        }}
      />
      <ul>{listItems}</ul>
    </div>
  );
}

export default App;
