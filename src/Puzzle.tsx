export interface Puzzle {
  input: string;
  solutions: string[];
}

export function puzzle(input: string, solutions: string[]): Puzzle {
  const shuffled = input
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");
  return {
    input: shuffled,
    solutions,
  };
}

export function isSolution(puzzle: Puzzle, word: string): boolean {
  return puzzle.solutions.includes(word);
}

export async function randomPuzzle(): Promise<Puzzle> {
  const index = Math.floor(Math.random() * 335_844).toFixed(0);
  const response = await window.fetch(`https://raw.githubusercontent.com/kyle-silver/mystery-box-puzzles/main/puzzles/${index}.json`);
  const json = await response.json();
  console.log("retrieved JSON: ", json);
  return puzzle(json["input"], json["solutions"]);
}
