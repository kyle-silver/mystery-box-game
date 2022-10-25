import { Copy, ShareIos } from "iconoir-react";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import "./ModalShare.css";

function Footer({ contents }: { contents: string }): JSX.Element {
  if (isMobile) {
    return <></>;
  }
  return (
    <footer>
      <p>hi</p>
    </footer>
  );
}

export interface ModalShareProps {
  contents: string;
  show: boolean;
  onHide: () => void;
}

export function ModalShare({ contents, show, onHide }: ModalShareProps): JSX.Element {
  // hide when you click outside
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onHide();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onHide]);

  return (
    <div
      className="modal-share"
      style={{
        display: show ? "block" : "none",
      }}
    >
      <div className="modal-content" ref={ref}>
        <h3>Share</h3>
        <div className="share-element">
          <div className="share-data">
            <p>{contents}</p>
          </div>
          <div className="copy-share-element">
            <button
              onClick={() => {
                if (isMobile) {
                  if (navigator.share) {
                    navigator.share({ text: contents });
                  } else {
                    window.alert("Sharing is not available. Make sure you're using HTTPS");
                  }
                } else {
                  navigator.clipboard.writeText(contents);
                }
              }}
            >
              {isMobile ? <ShareIos /> : <Copy />}
            </button>
          </div>
        </div>
        <Footer contents={contents} />
      </div>
    </div>
  );
}

export {};
