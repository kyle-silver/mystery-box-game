import useEventListener from "@use-it/event-listener";
import { useState } from "react";

function computeNewInput(char: string, input: string): string {
  // lowercase letters only
  char = char.toLowerCase();
  // only accept alphabetic characters
  if (char.search("^[a-z]$") < 0) {
    return input;
  }
  // cannot re-use letters
  if (input.includes(char)) {
    return input;
  }
  // input cannot be more than eight characters
  if (input.length >= 8) {
    return input;
  }
  // append
  return input + char;
}

function backspace(input: string): string {
  if (input.length === 0) {
    return input;
  }
  return input.substring(0, input.length - 1);
}

export interface KeyboardProps {
  onSubmit: (input: string) => void;
}

export function UserInputField(props: KeyboardProps): JSX.Element {
  const [input, setInput] = useState("");

  // we're kinda implementing our own custom text field here, which is BAD and
  // we should FEEL BAD about doing it.
  useEventListener("keydown", (event) => {
    const { key } = event as KeyboardEvent;
    if (key === "Enter") {
      if (input.length < 4) {
        return;
      }
      props.onSubmit(input);
      setInput("");
    } else if (key === "Backspace") {
      const newInput = backspace(input);
      setInput(newInput);
    } else {
      const newInput = computeNewInput(key, input);
      setInput(newInput);
    }
  });

  return (
    <div className="input-container">
      <p className="input-field">
        {input}
        <span className="blink">_</span>
      </p>
    </div>
  );
}

export {};
