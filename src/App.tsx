import { useEffect, useState } from "react";
import { Puzzle, randomPuzzle } from "./Puzzle";
import { LoadingSidebar, Sidebar } from "./Sidebar";
import { EmptyWordGuessArea, Entry, WordGuessArea } from "./WordGuessArea";
import "./App.css";

function App() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    async function retrieve() {
      const retrieved = await randomPuzzle();
      setEntries([]);
      setPuzzle(retrieved);
    }
    if (puzzle === null) {
      retrieve();
    }
  });

  if (puzzle) {
    return (
      <div className="container">
        <Sidebar puzzle={puzzle} setPuzzle={setPuzzle} entries={entries} />
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
