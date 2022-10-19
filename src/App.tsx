import { useEffect, useState } from "react";
import { Puzzle, randomPuzzle } from "./Puzzle";
import { LoadingSidebar, Sidebar } from "./Sidebar";
import { EmptyWordGuessArea, Entry, WordGuessArea } from "./WordGuessArea";
import "./App.css";

export type State<T> = [value: T, setValue: React.Dispatch<React.SetStateAction<T>>];

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const peaceful = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // retrieve the puzzle
  useEffect(() => {
    async function retrieve() {
      const retrieved = await randomPuzzle();
      setEntries([]);
      setPuzzle(retrieved);
    }
    if (puzzle === null) {
      retrieve();
    }
  }, [puzzle]);

  // set the color theme
  useEffect(() => {
    const root = document.documentElement;
    const style = getComputedStyle(root);
    const white = style.getPropertyValue("--white");
    const black = style.getPropertyValue("--black");
    root.style.setProperty("--white", black);
    root.style.setProperty("--black", white);
  }, [darkMode]);

  if (puzzle) {
    return (
      <div className="container">
        <Sidebar entries={entries} puzzle={[puzzle, setPuzzle]} peaceful={peaceful} dark={[darkMode, setDarkMode]} />
        <WordGuessArea puzzle={puzzle} entries={entries} setEntries={setEntries} />
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
