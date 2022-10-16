import React, { useEffect, useRef, useState } from "react";
import { Puzzle } from "./Puzzle";
import "./WordGuessArea.css";

export interface Entry {
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

function acceptable(guess: string, puzzle: Puzzle, entries: Entry[]): boolean {
  return puzzle.isSolution(guess) && !entries.map((entry) => entry.word).includes(guess);
}

function isValidInput(value: string): boolean {
  // if the input field is empty, accept it
  if (value.length === 0) {
    return true;
  }
  // each letter can only be used once
  const last = value[value.length - 1];
  if (value.substring(0, value.length - 1).includes(last)) {
    return false;
  }
  return value.search("^[a-z]{0,8}$") >= 0;
}

export interface WordGuessProps {
  puzzle: Puzzle;
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export function WordGuessArea(props: WordGuessProps) {
  const { puzzle, entries, setEntries: onEntryChange } = props;
  const [input, setInput] = useState("");
  const listItems = entries.map(WordListEntry);
  const userInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (userInput.current) {
      console.log("focusing...");
      userInput.current.focus();
    }
  }, []);
  return (
    <div className="word-guess-area">
      <ul>{listItems}</ul>
      <input
        type="text"
        value={input}
        style={{
          width: `${input.length}ch`,
        }}
        ref={userInput}
        onInput={(e) => {
          const value = e.currentTarget.value.toLowerCase();
          if (isValidInput(value)) {
            setInput(value);
          }
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter" || input.length < 4) {
            return;
          }
          onEntryChange([...entries, { word: input, accepted: acceptable(input, puzzle, entries) }]);
          setInput("");
        }}
      />
      <span className="blink">_</span>
    </div>
  );
}

export function EmptyWordGuessArea() {
  return <div>Retrieving data...</div>;
}
