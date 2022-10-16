import { Puzzle } from "./Puzzle";
import { Entry } from "./WordGuessArea";
import "./Sidebar.css";

export interface SidebarProps {
  puzzle: Puzzle;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle | null>>;
  entries: Entry[];
}

export function Sidebar(props: SidebarProps): JSX.Element {
  const { puzzle, setPuzzle, entries } = props;
  const accepted = entries.filter((entry) => entry.accepted).length;
  return (
    <div className="sidebar">
      <p className="puzzle-input">{puzzle.input.toUpperCase()}</p>
      <p className="counter">[{accepted}/8]</p>
      <button onClick={() => setPuzzle(null)}>new</button>
    </div>
  );
}

export {};
