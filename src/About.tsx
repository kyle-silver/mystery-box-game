import useEventListener from "@use-it/event-listener";
import React, { Dispatch, SetStateAction } from "react";
import "./About.css";
import { Options } from "./App";
import { DARK_MODE, LIGHT_MODE } from "./Colors";

interface OptionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function Option({ title, description, children }: OptionProps): JSX.Element {
  return (
    <>
      <div>
        <p className="option-table">
          <b>{title}</b>
        </p>
      </div>
      <div>{children}</div>
      <div>
        <p className="option-table">{description}</p>
      </div>
    </>
  );
}

export interface AboutProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  options: Options;
  setOptions: Dispatch<SetStateAction<Options>>;
}

export function About({ show, setShow, options, setOptions }: AboutProps): JSX.Element {
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
        display: show ? "block" : "none",
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
          <Option title="Peaceful mode" description="Play without a timer">
            <input
              type="checkbox"
              checked={options.peaceful}
              onChange={() => {
                setOptions({ ...options, peaceful: !options.peaceful });
              }}
            />
          </Option>
          <Option title="Dark mode" description="Invert foreground and background colors">
            <input
              type="checkbox"
              checked={options.theme === DARK_MODE}
              onChange={() => {
                const theme = options.theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
                setOptions({ ...options, theme });
              }}
            />
          </Option>
        </div>
      </div>
    </div>
  );
}
