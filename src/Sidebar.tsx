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
    <>
      <div className="sidebar">
        <p className="puzzle-input">{puzzle.input.toUpperCase()}</p>
        <p className="counter">[{accepted}/8]</p>
        <div tabIndex={1}>
          <button onClick={() => setPuzzle(null)}>NEW</button>
        </div>
        <br />
        <div className="about" tabIndex={2}>
          <button onClick={() => console.log("hi")}>ABOUT</button>
        </div>
      </div>
    </>
  );
}

export function LoadingSidebar(): JSX.Element {
  return (
    <div className="sidebar">
      <p className="puzzle-input">loading&hellip;</p>
      <p className="counter">[0/8]</p>
      <div tabIndex={1}>
        <button>NEW</button>
      </div>
      <br />
      <div className="about" tabIndex={2}>
        <button onClick={() => console.log("hi")}>ABOUT</button>
      </div>
    </div>
  );
}

export {};
