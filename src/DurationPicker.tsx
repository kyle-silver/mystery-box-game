export interface Duration {
  minutes: number;
  seconds: number;
}

export function normalize(minutes: number, seconds: number): Duration {
  if (seconds < 0) {
    const fullMinutesUnder = Math.ceil(seconds / 60) + 1;
    const secondsToAdd = fullMinutesUnder * 60;
    const updatedSeconds = seconds + secondsToAdd;
    const updatedMinutes = minutes - fullMinutesUnder;
    if (updatedMinutes < 0) {
      return { minutes: 0, seconds: 0 };
    }
    return { minutes: updatedMinutes, seconds: updatedSeconds };
  } else if (seconds < 60) {
    return { minutes, seconds };
  } else {
    const fullMinutesOver = Math.floor(seconds / 60);
    const secondsToSubtract = fullMinutesOver * 60;
    const updatedSeconds = seconds - secondsToSubtract;
    const updatedMinutes = minutes + fullMinutesOver;
    if (updatedMinutes > 99) {
      return { minutes: 99, seconds: 59 };
    }
    return { minutes: updatedMinutes, seconds: updatedSeconds };
  }
}

export function display(duration: Duration, leadingMinuteZero?: boolean): string {
  const minutes = leadingMinuteZero ? duration.minutes.toFixed(0).padStart(2, "0") : duration.minutes.toFixed(0);
  const seconds = duration.seconds.toFixed(0).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function asSeconds(duration: Duration): number {
  return duration.minutes * 60 + duration.seconds;
}

export function subtract(minuend: Duration, subtrahend: Duration): Duration {
  const first = asSeconds(minuend);
  const second = asSeconds(subtrahend);
  return normalize(0, first - second);
}

function parseDuration(duration: string): Duration {
  const [minutes, seconds] = duration.split(":").map(parseInt);
  return { minutes, seconds };
}

export interface DurationPickerProps {
  duration: Duration;
  onChange: (duration: Duration) => void;
}

export function DurationPicker({ duration, onChange }: DurationPickerProps): JSX.Element {
  const [mins, secs] = display(duration, true).split(":");
  return (
    <div className="duration-picker">
      <input
        className="duration-value-picker"
        type="text"
        inputMode="numeric"
        value={display(duration, true)}
        onChange={(event) => {
          console.log(event);
          if (event.nativeEvent instanceof InputEvent) {
            console.log("Skipping key input");
            return;
          }
          const duration = parseDuration(event.target.value);
          onChange(duration);
        }}
        onKeyDown={({ key }) => {
          if (key.match("\\d")) {
            // tack the new digit on to the front and deal with the formatting
            // consequences
            const minutes = parseInt(mins.charAt(1) + secs.charAt(0));
            const seconds = parseInt(secs.charAt(1) + key);
            onChange({ minutes, seconds });
          } else if (key === "Backspace") {
            const minutes = parseInt(mins.charAt(0));
            const seconds = parseInt(mins.charAt(1) + secs.charAt(0));
            onChange({ minutes, seconds });
          } else if (key === "ArrowUp") {
            onChange(normalize(duration.minutes, duration.seconds + 1));
          } else if (key === "ArrowDown") {
            onChange(normalize(duration.minutes, duration.seconds - 1));
          }
        }}
        onBlur={() => {
          onChange(normalize(duration.minutes, duration.seconds));
        }}
      />
    </div>
  );
}
