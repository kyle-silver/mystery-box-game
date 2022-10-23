import { Dispatch, SetStateAction, useEffect } from "react";
import { GameState } from "./App";
import { normalize } from "./DurationPicker";
import "./Timer.css";

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
      <p className={state.paused ? "timer-accepted" : "timer"}>{`${state.remaining.minutes.toFixed(0)}:${state.remaining.seconds
        .toFixed(0)
        .padStart(2, "0")}`}</p>
    </div>
  );
}
