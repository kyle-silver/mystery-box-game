import { Puzzle } from "./Puzzle";
import { Entry } from "./WordGuessArea";
import "./Sidebar.css";
import { useState } from "react";
import { About } from "./About";

export interface SidebarProps {
  puzzle: Puzzle;
  setPuzzle: React.Dispatch<React.SetStateAction<Puzzle | null>>;
  entries: Entry[];
}

export function Sidebar({ puzzle, setPuzzle, entries }: SidebarProps): JSX.Element {
  const [showAbout, setShowAbout] = useState(false);
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
        <div className="about-button" tabIndex={2}>
          <button onClick={() => setShowAbout(!showAbout)}>ABOUT</button>
        </div>
      </div>
      <About show={showAbout} setShow={setShowAbout} />
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
