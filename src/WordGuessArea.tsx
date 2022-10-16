import React, { useState } from "react";

interface Entry {
  word: string;
  accepted: boolean;
}

function WordListEntry(entry: Entry, index: number): JSX.Element {
  return (
    <li key={index} className={entry.accepted ? "accepted" : "rejected"}>
      {entry.word}
    </li>
  );
}

function isValidInput(value: string): boolean {
  return value.search("^[a-z]{0,8}$") >= 0;
}

export function WordGuessArea() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const listItems = entries.map(WordListEntry);
  return (
    <div>
      <p>There are {entries.length} words in the list</p>
      <input
        type="text"
        value={input}
        onInput={(e) => {
          const value = e.currentTarget.value.toLowerCase();
          if (isValidInput(value)) {
            setInput(value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && input.length >= 4) {
            setEntries([...entries, { word: input, accepted: true }]);
            setInput("");
          }
        }}
      />
      <ul>{listItems}</ul>
    </div>
  );
}
