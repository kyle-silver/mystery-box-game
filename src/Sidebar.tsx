import "./Sidebar.css";
import { Dispatch, SetStateAction, useState } from "react";
import { About } from "./About";
import { Timer } from "./Timer";
import { GameState, Options } from "./App";

export interface SidebarProps {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState | null>>;
  options: Options;
  setOptions: Dispatch<SetStateAction<Options>>;
}

export function Sidebar({ state, setState, options, setOptions }: SidebarProps): JSX.Element {
  const [showAbout, setShowAbout] = useState(false);
  const accepted = state.entries.filter((entry) => entry.accepted).length;
  return (
    <>
      <div className="sidebar">
        <p className="puzzle-input">{state.puzzle.input.toUpperCase()}</p>
        <p className="counter">[{accepted}/8]</p>
        {!options.peaceful && <Timer secondsAtStart={60} />}
        <div tabIndex={1}>
          <button onClick={() => setState(null)}>NEW</button>
        </div>
        <br />
        <div className="about-button" tabIndex={2}>
          <button onClick={() => setShowAbout(!showAbout)}>ABOUT</button>
        </div>
      </div>
      <About show={showAbout} setShow={setShowAbout} options={options} setOptions={setOptions} />
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
