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

function parseDuration(duration: string): Duration {
  const [minutes, seconds] = duration.split(":").map(parseInt);
  return { minutes, seconds };
}

export interface DurationPickerProps {
  minutes: number;
  seconds: number;
  onChange: (duration: Duration) => void;
}

export function DurationPicker({ minutes, seconds, onChange }: DurationPickerProps): JSX.Element {
  const mins = minutes.toFixed(0).padStart(2, "0");
  const secs = seconds.toFixed(0).padStart(2, "0");
  const display = `${mins}:${secs}`;
  return (
    <div className="duration-picker">
      <input
        className="duration-value-picker"
        type="text"
        inputMode="numeric"
        value={display}
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
            onChange(normalize(minutes, seconds + 1));
          } else if (key === "ArrowDown") {
            onChange(normalize(minutes, seconds - 1));
          }
        }}
        onBlur={() => {
          onChange(normalize(minutes, seconds));
        }}
      />
    </div>
  );
}
