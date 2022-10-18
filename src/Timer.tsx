import React from "react";
import "./Timer.css";

interface TimerState {
  secondsRemaining: number;
}

export interface TimerProps {
  secondsAtStart: number;
}

/**
 * Stolen whole-cloth from https://reactjs.org/docs/state-and-lifecycle.html
 */
export class Timer extends React.Component<TimerProps, TimerState> {
  timerId: NodeJS.Timeout | null = null;

  constructor(props: TimerProps) {
    super(props);
    this.state = { secondsRemaining: props.secondsAtStart };
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  tick() {
    if (this.state.secondsRemaining > 0) {
      this.setState({
        secondsRemaining: this.state.secondsRemaining - 1,
      });
    }
  }

  render() {
    const time = this.state.secondsRemaining;
    const minutes = Math.floor(time / 60).toFixed(0);
    const seconds = (time % 60).toFixed(0).padStart(2, "0");
    return (
      <div>
        <p className={time === 0 ? "timer-expired" : "timer"}>{`${minutes}:${seconds}`}</p>
      </div>
    );
  }
}
