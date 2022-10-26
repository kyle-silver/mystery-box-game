import { Copy, ShareIos, Twitter } from "iconoir-react";
import { useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import "./ModalShare.css";

function SocialMediaSharing({ contents }: { contents: string }): JSX.Element {
  if (isMobile) {
    return <></>;
  }
  const encoded = encodeURIComponent(contents);
  return (
    <div className="socials">
      <meta property="og:title" content={contents} />
      <p className="share-text">&hellip;or share how you did on Twitter</p>
      <div className="socials-carousel">
        <button
          onClick={() => {
            const twitterLink = `https://twitter.com/intent/tweet?text=${encoded}`;
            window.open(twitterLink, "_blank");
          }}
        >
          <Twitter />
        </button>
      </div>
    </div>
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
        {isMobile ? (
          <p className="share-text">Show your friends how you did</p>
        ) : (
          <p className="share-text">Copy your score to the clipboard</p>
        )}
        <div className="share-element">
          <div className="share-data">
            <p>{contents}</p>
          </div>
          <div className="copy-share-element">
            <button
              className="copy-button"
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
        <SocialMediaSharing contents={contents} />
      </div>
    </div>
  );
}

export {};
