import { Copy } from "iconoir-react";
import { isBrowser, isMobile } from "react-device-detect";
import "./ModalShare.css";

export interface ModalShareProps {
  contents: string;
  show: boolean;
  onHide: () => void;
}

export function ModalShare({ contents, show, onHide }: ModalShareProps): JSX.Element {
  return (
    <div
      className="modal-share"
      style={{
        display: show ? "block" : "none",
      }}
    >
      <div className="modal-content">
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
                    window.alert("Sharing is not available.");
                  }
                } else {
                  navigator.clipboard.writeText(contents);
                }
              }}
            >
              <Copy />
            </button>
          </div>
        </div>
        <footer>
          <p>footer content</p>
        </footer>
      </div>
    </div>
  );
}

export {};
