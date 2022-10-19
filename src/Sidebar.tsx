import { Puzzle } from "./Puzzle";
import { Entry } from "./WordGuessArea";
import "./Sidebar.css";
import { useState } from "react";
import { About } from "./About";
import { Timer } from "./Timer";
import { State } from "./App";

export interface SidebarProps {
  entries: Entry[];
  puzzle: State<Puzzle | null>;
  peaceful: State<boolean>;
  dark: State<boolean>;
}

export function Sidebar({ puzzle, entries, peaceful, dark }: SidebarProps): JSX.Element {
  const [showAbout, setShowAbout] = useState(false);
  const [puzzleValue, setPuzzle] = puzzle;
  const accepted = entries.filter((entry) => entry.accepted).length;
  return (
    <>
      <div className="sidebar">
        <p className="puzzle-input">{puzzleValue?.input.toUpperCase()}</p>
        <p className="counter">[{accepted}/8]</p>
        {!peaceful[0] && <Timer secondsAtStart={60} />}
        <div tabIndex={1}>
          <button onClick={() => setPuzzle(null)}>NEW</button>
        </div>
        <br />
        <div className="about-button" tabIndex={2}>
          <button onClick={() => setShowAbout(!showAbout)}>ABOUT</button>
        </div>
      </div>
      <About show={[showAbout, setShowAbout]} peaceful={peaceful} dark={dark} />
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
      <div className="about-button" tabIndex={2}>
        <button>ABOUT</button>
      </div>
    </div>
  );
}
