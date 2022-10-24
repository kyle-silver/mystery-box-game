import { Dispatch, SetStateAction, useEffect } from "react";
import { GameState } from "./App";
import { normalize, asSeconds } from "./DurationPicker";
import "./Timer.css";

function timerClass(state: GameState): string {
  if (asSeconds(state.remaining) === 0) {
    return "timer-rejected";
  }
  if (state.paused) {
    return "timer-accepted";
  }
  return "timer";
}

export interface TimerProps {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
}

export function Timer({ state, setState }: TimerProps): JSX.Element {
  useEffect(() => {
    let interval: NodeJS.Timer | undefined;
    if (!state.paused) {
      interval = setInterval(() => {
        const remaining = normalize(state.remaining.minutes, state.remaining.seconds - 1);
        setState({
          ...state,
          remaining,
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state, setState]);
  return (
    <div>
      <p className={timerClass(state)}>{`${state.remaining.minutes.toFixed(0)}:${state.remaining.seconds.toFixed(0).padStart(2, "0")}`}</p>
    </div>
  );
}
