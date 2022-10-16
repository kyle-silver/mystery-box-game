export class Puzzle {
  input: string;
  solutions: string[];

  constructor(input: string, solutions: string[]) {
    const shuffled = input
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
    this.input = shuffled;
    this.solutions = solutions;
  }

  isSolution(word: string): boolean {
    return this.solutions.includes(word);
  }
}

export async function randomPuzzle(): Promise<Puzzle> {
  const index = Math.floor(Math.random() * 401_430).toFixed(0);
  const response = await window.fetch(`https://raw.githubusercontent.com/kyle-silver/mystery-box-puzzles/main/puzzles/${index}.json`);
  const json = await response.json();
  return new Puzzle(json["inputs"], json["solutions"]);
}
