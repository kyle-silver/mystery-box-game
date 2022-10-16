import React, { useEffect, useRef } from "react";
import { Keyboard } from "./Keyboard";
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

export interface WordGuessProps {
  puzzle: Puzzle;
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}

export function WordGuessArea(props: WordGuessProps) {
  const { puzzle, entries, setEntries: onEntryChange } = props;
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
      <Keyboard
        onSubmit={(input) => {
          onEntryChange([...entries, { word: input, accepted: acceptable(input, puzzle, entries) }]);
        }}
      />
    </div>
  );
}

export function EmptyWordGuessArea() {
  return <div></div>;
}
