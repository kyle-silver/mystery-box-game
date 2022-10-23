import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GameState } from "./App";
import { Duration, normalize } from "./DurationPicker";
import "./Timer.css";

interface TimerState {
  secondsRemaining: number;
  onTick: (duration: Duration) => void;
}

export interface TimerProps {
  state: GameState;
  setState: Dispatch<SetStateAction<GameState>>;
}

export function Timer({ state, setState }: TimerProps): JSX.Element {
  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = normalize(state.remaining.minutes, state.remaining.seconds - 1);
      setState({
        ...state,
        remaining,
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state, setState]);
  return (
    <div>
      <p className="timer">{`${state.remaining.minutes.toFixed(0)}:${state.remaining.seconds.toFixed(0).padStart(2, "0")}`}</p>
    </div>
  );
}

/**
 * Stolen whole-cloth from https://reactjs.org/docs/state-and-lifecycle.html
 */
// export class Timer extends React.Component<TimerProps, TimerState> {
//   timerId: NodeJS.Timeout | null = null;

//   constructor(props: TimerProps) {
//     super(props);
//     this.state = { secondsRemaining: props.secondsAtStart, onTick: props.onTick };
//   }

//   componentDidMount() {
//     this.timerId = setInterval(() => this.tick(), 1000);
//   }

//   componentWillUnmount() {
//     if (this.timerId) {
//       clearInterval(this.timerId);
//     }
//   }

//   tick() {
//     if (this.state.secondsRemaining > 0) {
//       const secondsRemaining = this.state.secondsRemaining - 1;
//       this.setState({
//         secondsRemaining,
//       });
//       // let the lord sort 'em...
//       const duration = normalize(0, secondsRemaining);
//       this.state.onTick(duration);
//     }
//   }

//   render() {
//     const time = this.state.secondsRemaining;
//     const minutes = Math.floor(time / 60).toFixed(0);
//     const seconds = (time % 60).toFixed(0).padStart(2, "0");
//     return (
//       <div>
//         <p className={time === 0 ? "timer-expired" : "timer"}>{`${minutes}:${seconds}`}</p>
//       </div>
//     );
//   }
// }
