import useEventListener from "@use-it/event-listener";
import React from "react";
import "./About.css";
import { State } from "./App";

interface OptionProps {
  state: State<boolean>;
  title: string;
  description: string;
}

function Option({ state, title, description }: OptionProps): JSX.Element {
  const [value, setValue] = state;
  return (
    <>
      <div>
        <p className="option-table">
          <b>{title}</b>
        </p>
      </div>
      <div>
        <input
          type="checkbox"
          checked={value}
          onChange={() => {
            setValue(!value);
          }}
        />
      </div>
      <div>
        <p className="option-table">{description}</p>
      </div>
    </>
  );
}

export interface AboutProps {
  show: State<boolean>;
  peaceful: State<boolean>;
  dark: State<boolean>;
}

export function About({ show, peaceful, dark }: AboutProps): JSX.Element {
  const [showAbout, setShow] = show;
  useEventListener("keydown", (event) => {
    const { key } = event as KeyboardEvent;
    if (key === "Escape") {
      event.preventDefault();
      setShow(false);
    }
  });

  return (
    <div
      className="about-container"
      style={{
        display: showAbout ? "block" : "none",
      }}
    >
      <div className="about">
        <button onClick={() => setShow(false)}>&times;</button>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolores vel inventore magnam. Nisi quasi hic rem quos, delectus aspernatur ex
          veniam quod inventore in optio recusandae culpa dicta itaque.
        </p>
        <div className="options">
          <Option state={peaceful} title="Peaceful mode" description="Play without a timer" />
          <Option state={dark} title="Dark mode" description="Invert background and foreground colors" />
        </div>
      </div>
    </div>
  );
}
