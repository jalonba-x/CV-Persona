import { useState, useEffect, useRef } from "react";
import { playSelectSound } from "./utils/audio.js";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import mainm from "./assets/mainm.jpeg";
import mainm2 from "./assets/mainm2.jpeg";
import mainf from "./assets/mainf.jpeg";

const CHARS = [char1, char2, char3];
const MAIN_IMAGES = [mainm, mainm2, mainf];

const REVEAL_CONTENT = [
  {
    upper: ["Freelance EN-ES language localization specialist",
       "Looking to break into the gaming industry"],
    lower: "Name: Javier Barrera | Age: 33 | Location: Santiago, Chile",
  },
  {
    upper: [
      "Language specialist with ten years of experience",
      "in localization (EN-ES), language quality assurance,",
      "and multilingual data annotation.",
    ],
    lower: "Localization | Language QA | Linguistics",
  },
  {
    upper: [
      "Spanish (Native), English (Professional), Portuguese (Basic)",
      "Passionate about languages and cultures",
    ],
    lower: "LinkedIn: @javierbarrerab",
  },
];

const ITEMS = [
  {
    id: "persona", label: "PERSONA", handle: "@javierbarrerab", href: "https://www.linkedin.com/in/javierbarrerab", icon: "👤", barIcon: icon1, bars: 1, newBars: [0], counts: ["16"],
    links: ["linkedin.com/in/javierbarrerab"],
    stats: [
      { tag: "AGE", value: "33", color: "#d92323" },
      { tag: "YEARS OF EXPERIENCE", value: "+6",  color: "#7b7b7b" },
    ],
  },
  {
    id: "fun", label: "EXPERIENCE", handle: "@javierbarrerab", href: "https://www.linkedin.com/in/javierbarrerab", icon: "🏫", barIcon: icon2, bars: 2, newBars: [0, 1], counts: ["UCH", "Humanities"],
    links: ["UCH/Universidad de Chile", "Linguistics/course"],
    stats: [
      { tag: "BA", value: "LINGUISTICS", color: "#d92323" },
      { tag: "CAMPUS", value: "Filosofía y Humanidades",  color: "#732424" },
    ],
  },
  {
    id: "weird", label: "LANGUAGES", handle: "@", href: "https://github.com/jalonba-x", icon: "💻", barIcon: icon3, bars: 3, newBars: [0, 1, 2], counts: ["JAVA", "JS", "WEB"],
    links: ["learning/java", "learning/javascript", "web/development"],
    stats: [
      { tag: "FAV", value: "JAVA", color: "#ffffff" },
      { tag: "FAV", value: "JS",  color: "#d92323" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const isFirstRenderAudio = useRef(true);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
    }
    playSelectSound();
  }, [active]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter") setRevealed(true);
      if (e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed]);

  return (
    <div id="menu-screen">
      {/* <video src={bgVideo} autoPlay loop muted playsInline /> */}
      {revealed && <div key={`dim-${active}`} className="sc-dim" />}
      {revealed && (
        <div key={`panel-${active}`} className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}
      {revealed && (
        <div key={`nav-${active}`} className="sc-right-nav">
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-dot" />
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}
      {revealed && (
        <div key={`portrait-${active}`} className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img
            className="sc-main-portrait"
            src={MAIN_IMAGES[active]}
            alt=""
          />
        </div>
      )}
<style>{`
        #menu-screen {
          position: relative;
          width: 100vw;
          height: 100vh;
          background-color: #0f1115;
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .sc-dim {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          z-index: 20;
          backdrop-filter: blur(4px);
        }

        .sc-root {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 40px;
          max-width: 500px;
          z-index: 10;
        }

        .sc-bar-outer {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          opacity: 0;
          transform: translateX(-50px);
          transition: transform 0.4s ease, opacity 0.4s ease, scale 0.2s ease;
        }

        .sc-bar-outer.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        /* Cambia el color a rojo con hover o teclado activo */
        .sc-bar-outer:hover,
        .sc-bar-outer.active {
          scale: 1.03;
        }

        .sc-bar-outer:hover .sc-bar-outer,
        .sc-bar-outer.active .sc-bar-outer {
          /* Si tenías un borde de debuggeo que cambiaba a rojo, se maneja aquí */
        }

        .sc-bar-red {
          width: 6px;
          height: 60px;
          background-color: #d92323;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .sc-bar-outer.active .sc-bar-red,
        .sc-bar-outer:hover .sc-bar-red {
          opacity: 1;
        }

        .sc-bar {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          height: 60px;
          background: rgba(30, 34, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0 15px;
          overflow: hidden;
        }

        .sc-char {
          height: 80%;
          object-fit: contain;
          margin-right: 15px;
          pointer-events: none;
        }

        .sc-label {
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .sc-footer {
          position: relative;
          width: 100%;
          padding: 20px 40px;
          display: flex;
          gap: 30px;
          background: rgba(15, 17, 21, 0.9);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 5;
        }

        .sc-footer-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: #8a929e;
        }

        .sc-footer-key {
          background: #2e3440;
          color: #ffffff;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
      `}</style>

      {/* 2. AQUÍ SIGUEN TUS BOTONES FUERA DEL STYLE */}
      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            role="button;;"
            tabIndex={0}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onMouseMove={() => setActive(i)}
            onClick={() => {
              setActive(i);
              setRevealed(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActive(i);
                setRevealed(true);
              }
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-content">
                <div className="sc-label">{item.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>REVEAL</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
