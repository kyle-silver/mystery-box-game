import { Dispatch, SetStateAction } from "react";
import { GameState } from "./App";
import { UserInputField } from "./UserInputField";
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
  showKeyboard?: boolean;
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
}

export function WordGuessArea({ state, setState }: WordGuessProps) {
  const listItems = state.entries.map(WordListEntry);
  return (
    <div className="word-guess-area">
      <UserInputField
        onSubmit={(input) => {
          const entries = [{ word: input, accepted: acceptable(input, state.puzzle, state.entries) }, ...state.entries];
          setState({
            ...state,
            entries,
          });
        }}
      />
      <ul>{listItems}</ul>
    </div>
  );
}

export function EmptyWordGuessArea() {
  return <div></div>;
}
