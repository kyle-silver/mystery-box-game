import "./Sidebar.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { About } from "./About";
import { Timer } from "./Timer";
import { GameState, Options } from "./App";
import { shareString, shareable, ShareButton } from "./Share";

function shouldPause(state: GameState, options: Options): boolean {
  if (options.peaceful) {
    return false;
  }
  if (state.paused) {
    return false; // we only want to pause once
  }
  const accepted = state.entries.filter((entry) => entry.accepted).length;
  if (accepted >= 8) {
    return true;
  }
  if (state.remaining.minutes === 0 && state.remaining.seconds === 0) {
    return true;
  }
  return false;
}

export interface SidebarProps {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState | null>>;
  options: Options;
  setOptions: Dispatch<SetStateAction<Options>>;
}

export function Sidebar({ state, setState, options, setOptions }: SidebarProps): JSX.Element {
  const [showAbout, setShowAbout] = useState(false);
  const accepted = state.entries.filter((entry) => entry.accepted).length;
  // pause the timer when
  useEffect(() => {
    if (shouldPause(state, options)) {
      console.log("pausing!");
      setState({
        ...state,
        paused: true,
        sharing: shareable(state, options),
      });
    }
    return () => {};
  }, [accepted, state, setState, options]);
  return (
    <>
      <div className="sidebar">
        <p className="puzzle-input">{state.puzzle.input.toUpperCase()}</p>
        <p className="counter">[{accepted}/8]</p>
        {!options.peaceful && <Timer state={state} setState={setState as Dispatch<SetStateAction<GameState>>} />}
        <div tabIndex={1}>
          <button onClick={() => setState(null)}>NEW</button>
        </div>
        <br />
        {state.sharing && (
          <>
            <ShareButton sharing={state.sharing} />
            <br />
          </>
        )}
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
