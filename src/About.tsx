import useEventListener from "@use-it/event-listener";
import React, { Dispatch, SetStateAction } from "react";
import "./About.css";
import { Options } from "./App";
import { DARK_MODE, LIGHT_MODE } from "./Colors";
import { DurationPicker } from "./DurationPicker";

interface OptionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function Option({ title, description, children }: OptionProps): JSX.Element {
  return (
    <div className="option">
      <div className="option-control">
        <div className="option-title">
          <p>
            <b>{title}</b>
          </p>
        </div>
        <div className="option-input">{children}</div>
      </div>
      <div className="option-description">
        <p>{description}</p>
      </div>
    </div>
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolores vel inventore magnam. Nisi quasi
          hic rem quos, delectus aspernatur ex veniam quod inventore in optio recusandae culpa dicta itaque.
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
              checked={options.theme.name === DARK_MODE.name}
              onChange={() => {
                const theme = options.theme.name === LIGHT_MODE.name ? DARK_MODE : LIGHT_MODE;
                setOptions({ ...options, theme });
              }}
            />
          </Option>
          <Option title="Timer" description="Test your skill">
            <DurationPicker
              duration={options.time}
              onChange={(time) => {
                setOptions({
                  ...options,
                  time,
                });
              }}
            />
          </Option>
        </div>
        <p>
          This project is free to use and open source. The concept and game design are by [PLACEHOLDER]C.J. The
          programming and web design are by <a href="https://kyle-silver.github.io">me</a>. The icons are by{" "}
          <a href="https://iconoir.com">Iconoir</a>.
        </p>
        <p>
          The source code for this project can be found on{" "}
          <a href="https://github.com/kyle-silver/mystery-box-game">GitHub</a>.
        </p>
      </div>
    </div>
  );
}
