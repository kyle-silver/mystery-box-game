import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Puzzle, randomPuzzle } from "./Puzzle";
import { LoadingSidebar, Sidebar } from "./Sidebar";
import { EmptyWordGuessArea, Entry, WordGuessArea } from "./WordGuessArea";
import "./App.css";
import { ColorTheme, LIGHT_MODE, setPalette } from "./Colors";
import { Duration } from "./DurationPicker";
import { Sharing } from "./Share";

export interface GameState {
  entries: Entry[];
  puzzle: Puzzle;
  remaining: Duration;
  paused: boolean;
  sharing: Sharing | null;
}

export interface Options {
  peaceful: boolean;
  theme: ColorTheme;
  time: Duration;
}

function App() {
  // load user settings from local storage if possible, otherwise use the app
  // defaults
  const storedOptions = JSON.parse(localStorage.getItem("options") ?? "null");
  const [options, setOptions] = useState<Options>(
    storedOptions || {
      peaceful: false,
      theme: LIGHT_MODE,
      time: {
        minutes: 2,
        seconds: 30,
      },
    }
  );

  // if there was previously a game in progress, preference that over creating a
  // new game
  const storedState = JSON.parse(localStorage.getItem("state") ?? "null");
  const [state, setState] = useState<GameState | null>(storedState);

  // retrieve the puzzle
  useEffect(() => {
    async function retrieve() {
      const retrieved = await randomPuzzle();
      const updated: GameState = {
        ...state,
        entries: [],
        puzzle: retrieved,
        remaining: options.time,
        paused: false,
        sharing: null,
      };
      setState(updated);
    }
    if (state === null) {
      retrieve();
    }
  }, [state, options]);

  // set the color theme
  useEffect(() => {
    setPalette(options.theme);
  }, [options.theme]);

  // when the user exists the page, persist the current guesses and time
  // remaining
  useEffect(() => {
    function persistBeforeUnload(_event: BeforeUnloadEvent) {
      localStorage.setItem("options", JSON.stringify(options));
      if (state) {
        localStorage.setItem("state", JSON.stringify(state));
      }
    }
    window.addEventListener("beforeunload", persistBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", persistBeforeUnload);
    };
  }, [state, options]);

  if (state?.puzzle) {
    return (
      <div className="container">
        <Sidebar state={state} setState={setState} options={options} setOptions={setOptions} />
        <WordGuessArea state={state} setState={setState as Dispatch<SetStateAction<GameState>>} />
      </div>
    );
  }
  return (
    <div className="container">
      <LoadingSidebar />
      <EmptyWordGuessArea />
    </div>
  );
}

export default App;
