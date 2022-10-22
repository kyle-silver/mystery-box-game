import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Puzzle, randomPuzzle } from "./Puzzle";
import { LoadingSidebar, Sidebar } from "./Sidebar";
import { EmptyWordGuessArea, Entry, WordGuessArea } from "./WordGuessArea";
import "./App.css";
import { ColorTheme, LIGHT_MODE, setPalette } from "./Colors";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

export interface GameState {
  entries: Entry[];
  puzzle: Puzzle;
}

export interface Options {
  peaceful: boolean;
  theme: ColorTheme;
  minutes: number;
  seconds: number;
}

function App() {
  const [state, setState] = useState<GameState | null>(null);

  const [options, setOptions] = useState<Options>({
    peaceful: false,
    theme: LIGHT_MODE,
    minutes: 1,
    seconds: 0,
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
        <div className="mobile-keyboard">
          <Keyboard
            layout={{
              default: ["q w e r t y u i o p", "a s d f g h j k l", "{enter} z x c v b n m {bksp}"],
            }}
            display={{
              "{bksp}": "&#x232b",
              "{enter}": "enter",
            }}
            onChange={(input) => {
              console.log("input changed", input);
            }}
          />
        </div>
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
