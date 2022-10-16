import React, { useState } from "react";
import { Puzzle } from "./Puzzle";

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
}

export function WordGuessArea(props: WordGuessProps) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const listItems = entries.map(WordListEntry);
  const puzzle = props.puzzle;
  const accepted = entries.filter((entry) => entry.accepted).length;
  return (
    <div>
      <p>
        The word to guess is {puzzle.input} [{accepted} / 8]
      </p>
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
          if (e.key !== "Enter" || input.length < 4) {
            return;
          }
          setEntries([...entries, { word: input, accepted: acceptable(input, puzzle, entries) }]);
          setInput("");
        }}
      />
      <ul>{listItems}</ul>
    </div>
  );
}

export function EmptyWordGuessArea() {
  return <div>Retrieving data...</div>;
}
