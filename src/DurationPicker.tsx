interface TwoDigitInputProps {
  value: number;
  onChange: (value: number) => void;
}

function TwoDigitInput({ value, onChange }: TwoDigitInputProps): JSX.Element {
  const display = value.toFixed(0).padStart(2, "0");
  return (
    <input
      className="duration-value-picker"
      type="number"
      inputMode="numeric"
      min="0"
      max="99"
      value={display}
      onChange={(event) => {
        console.log(event);
        if (event.nativeEvent instanceof InputEvent) {
          console.log("Skipping key input");
          return;
        }
        const value = parseInt(event.target.value);
        onChange(value);
      }}
      onKeyDown={({ key }) => {
        if (key.match("\\d")) {
          const value = parseInt((display + key).substring(1, 3));
          onChange(value);
        } else if (key === "Backspace") {
          const value = parseInt(("0" + display).substring(0, 2));
          onChange(value);
        }
      }}
    />
  );
}

export interface DurationPickerProps {
  minutes: number;
  seconds: number;
  onChange: (minutes: number, seconds: number) => void;
}

export function DurationPicker({ minutes, seconds, onChange }: DurationPickerProps): JSX.Element {
  const minutesString = minutes.toFixed(0).padStart(2, "0");
  const secondsString = seconds.toFixed(0).padStart(2, "0");
  return (
    <div className="duration-picker">
      <TwoDigitInput
        value={minutes}
        onChange={(minutes) => {
          onChange(minutes, seconds);
        }}
      />
      <span className="time-separator">:</span>
      <TwoDigitInput
        value={seconds}
        onChange={(seconds) => {
          onChange(minutes, seconds);
        }}
      />
    </div>
  );
}
