import useEventListener from "@use-it/event-listener";
import "./About.css";

export interface AboutProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function About({ show, setShow }: AboutProps): JSX.Element {
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
        {/* <section className="about-inner"> */}
        <button onClick={() => setShow(false)}>&times;</button>
        <h1>About</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolores vel inventore magnam. Nisi quasi hic rem quos, delectus aspernatur ex
          veniam quod inventore in optio recusandae culpa dicta itaque.
        </p>
      </div>
    </div>
  );
}
