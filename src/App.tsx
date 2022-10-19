import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Puzzle, randomPuzzle } from "./Puzzle";
import { LoadingSidebar, Sidebar } from "./Sidebar";
import { EmptyWordGuessArea, Entry, WordGuessArea } from "./WordGuessArea";
import "./App.css";
import { ColorTheme, LIGHT_MODE, setPalette } from "./Colors";

export interface GameState {
  entries: Entry[];
  puzzle: Puzzle;
}

export interface Options {
  peaceful: boolean;
  theme: ColorTheme;
}

function App() {
  const [state, setState] = useState<GameState | null>(null);

  const [options, setOptions] = useState<Options>({
    peaceful: false,
    theme: LIGHT_MODE,
  });

  // retrieve the puzzle
  useEffect(() => {
    async function retrieve() {
      const retrieved = await randomPuzzle();
      setState({
        ...state,
        entries: [],
        puzzle: retrieved,
      });
    }
    if (state === null) {
      retrieve();
    }
  }, [state]);

  // set the color theme
  useEffect(() => {
    setPalette(options.theme);
  }, [options]);

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
