import useEventListener from "@use-it/event-listener";
import { useState } from "react";
import Keyboard from "react-simple-keyboard";
import { MobileView } from "react-device-detect";
import "react-simple-keyboard/build/css/index.css";

const VIRTUAL_KEYBOARD_CODES = new Map([
  ["{bksp}", "Backspace"],
  ["{enter}", "Enter"],
]);

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

export function UserInputField({ onSubmit }: KeyboardProps): JSX.Element {
  const [input, setInput] = useState("");

  function handleKey(key: string) {
    if (key === "Enter") {
      if (input.length < 4) {
        return;
      }
      onSubmit(input);
      setInput("");
    } else if (key === "Backspace") {
      const newInput = backspace(input);
      setInput(newInput);
    } else {
      const newInput = computeNewInput(key, input);
      setInput(newInput);
    }
  }

  // we're kinda implementing our own custom text field here, which is BAD and
  // we should FEEL BAD about doing it.
  useEventListener("keydown", (event) => {
    const { key } = event as KeyboardEvent;
    handleKey(key);
  });

  return (
    <div className="input-container">
      <p className="input-field">
        {input}
        <span className="blink">_</span>
      </p>
      <MobileView>
        <div className="mobile-keyboard">
          <Keyboard
            layout={{
              default: ["q w e r t y u i o p", "a s d f g h j k l", "{enter} z x c v b n m {bksp}"],
            }}
            display={{
              "{bksp}": "<||",
              "{enter}": "&nbsp;&#x21AA;&nbsp;",
            }}
            onKeyPress={(button: string) => {
              let key = VIRTUAL_KEYBOARD_CODES.get(button) || button;
              handleKey(key);
            }}
          />
        </div>
      </MobileView>
    </div>
  );
}

export {};
