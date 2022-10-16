import { useEffect, useState } from "react";
import { Puzzle, randomPuzzle } from "./Puzzle";
import { EmptyWordGuessArea, WordGuessArea } from "./WordGuessArea";

function App() {
  // const puzzle = new Puzzle("acpruwxy", ["awry", "carp", "crux", "pray", "racy", "warp", "wary", "waxy", "wrap", "xray"]);
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  useEffect(() => {
    async function retrieve() {
      const retrieved = await randomPuzzle();
      setPuzzle(retrieved);
    }
    if (puzzle === null) {
      retrieve();
    }
  });

  if (puzzle) {
    return <WordGuessArea puzzle={puzzle} />;
  }
  return <EmptyWordGuessArea />;
}

export default App;
