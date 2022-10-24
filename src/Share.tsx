import { GameState, Options } from "./App";
import { display, Duration, subtract } from "./DurationPicker";

export interface Sharing {
  puzzle: string;
  totalTime: Duration;
  timeUsed: Duration;
  correctGuesses: number;
  totalGuesses: number;
}

export function shareable(state: GameState, options: Options): Sharing {
  return {
    puzzle: state.puzzle.input,
    totalTime: options.time,
    timeUsed: subtract(options.time, state.remaining),
    correctGuesses: state.entries.filter((entry) => entry.accepted).length,
    totalGuesses: state.entries.length,
  };
}

export function shareString(sharing: Sharing): string {
  const correct = sharing.correctGuesses;
  const puzzle = sharing.puzzle.toUpperCase();
  const timeUsed = display(sharing.timeUsed);
  const totalTime = display(sharing.totalTime);
  const accuracy = sharing.totalGuesses !== 0 ? ((correct / sharing.totalGuesses) * 100).toFixed(0) : 0;
  return `[${correct}/8] ${puzzle} ${timeUsed}/${totalTime} (${accuracy}%)`;
}

export function ShareButton({ sharing }: { sharing: Sharing }): JSX.Element {
  return (
    <div>
      <button
        onClick={() => {
          console.log(shareString(sharing));
        }}
      >
        SHARE
      </button>
    </div>
  );
}
