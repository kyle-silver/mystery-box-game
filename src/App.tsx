import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Puzzle, randomPuzzle } from "./Puzzle";
import { LoadingSidebar, Sidebar } from "./Sidebar";
import { EmptyWordGuessArea, Entry, WordGuessArea } from "./WordGuessArea";
import "./App.css";
import { ColorTheme, LIGHT_MODE, setPalette } from "./Colors";
import { Duration } from "./DurationPicker";

export interface GameState {
  entries: Entry[];
  puzzle: Puzzle;
  remaining: Duration;
}

export interface Options {
  peaceful: boolean;
  theme: ColorTheme;
  time: Duration;
}

function App() {
  const [state, setState] = useState<GameState | null>(null);

  const [options, setOptions] = useState<Options>({
    peaceful: false,
    theme: LIGHT_MODE,
    time: {
      minutes: 2,
      seconds: 30,
    },
  });

  // retrieve the puzzle
  useEffect(() => {
    async function retrieve() {
      const retrieved = await randomPuzzle();
      const updated: GameState = {
        ...state,
        entries: [],
        puzzle: retrieved,
        remaining: options.time,
      };
      setState(updated);
      localStorage.setItem("puzzle", JSON.stringify(retrieved));
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
      console.log("running");
      if (state?.remaining) {
        localStorage.setItem("remaining", JSON.stringify(state.remaining));
      }
      if (state?.entries) {
        localStorage.setItem("entries", JSON.stringify(state.entries));
      }
    }
    window.addEventListener("beforeunload", persistBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", persistBeforeUnload);
    };
  }, [state]);

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
