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
        .sc-root {
  display: flex;
  flex-direction: column;
  gap: 20px;         /* Espacio controlado entre cada botón */
  z-index: 20;        /* Lo mantiene por encima de fondos pero bajo el dim */
  position: relative;
  pointer-events: auto; /* Asegura que capture clics */
}
        .sc-dim {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 50; /* Por encima del menú, por debajo del panel */
  pointer-events: all;
        }

        @keyframes sc-dim-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes sc-reveal-bar-in {
          0% {
            opacity: 0;
            transform: translateX(-120px) rotate(-20deg) scaleX(0.72);
          }
          60% {
            opacity: 0.96;
            transform: translateX(18px) rotate(-20deg) scaleX(1.03);
          }
          100% {
            opacity: 0.92;
            transform: translateX(0) rotate(-20deg) scaleX(1);
          }
        }

        @keyframes sc-portrait-in {
          0% {
            opacity: 0;
            transform: translateX(78px) skewX(-8deg) scale(0.94);
            filter: blur(8px);
          }
          55% {
            opacity: 0.96;
            transform: translateX(-8px) skewX(-8deg) scale(1.015);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateX(0) skewX(-8deg) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(-5px); opacity: 0.4; }
        }

        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(5px); opacity: 0.4; }
        }

        /* Retrato grande que se revela */
.sc-main-portrait-shell {
  position: absolute;
  right: 10%;
  bottom: 15%;
  z-index: 90;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

        .sc-main-portrait-shell.mounted {
  opacity: 1;
  transform: translateY(0);

        .sc-reveal-panel {
          position: absolute;
          top: 44vh;
          left: -6vw;
          width: 88vw;
          height: 60vh;
          z-index: 12;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          box-shadow:
            0 0 0 2px rgba(255,255,255,0.18),
            18px 0 0 rgba(217,35,35,0.82),
            28px 0 0 rgba(255,255,255,0.26);
          opacity: 0;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          transition: opacity 0.3s ease, transform 0.35s ease;
        }
        .sc-reveal-panel.mounted {
          opacity: 0.92;
          transform: translateX(0) rotate(-20deg);
          animation: sc-reveal-bar-in 0.46s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-reveal-panel::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(180deg, #d92323 0%, #d92323 100%);
          clip-path: inherit;
        }
        .sc-reveal-upper-bar {
          position: absolute;
          top: 10%;
          left: 0%;
          width: 100%;
          height: 40%;
          background: rgba(13,13,13,0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #ffffff;
          text-align: center;
        }
        .sc-reveal-upper-line {
          font-family: 'Persona5Main';
          font-weight: 200;
          font-size: 26px;
          letter-spacing: -10px;
          word-spacing: 20px;
          line-height: 2.0;
        }
        .sc-reveal-lower-bar {
          position: absolute;
          top: 58%;
          right: 0;
          width: 48%;
          height: 20%;
          background: rgba(13,13,13,0.92);
          clip-path: polygon(0 0, 100% 0, calc(100% - 22px) 100%, 0 100%);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #ffffff;
          font-family: 'Bebas Neue';
          font-weight: 400;
          font-size: 22px;
          letter-spacing: 0px;
          text-transform: lowercase;
          padding-left: 22px;
        }
        @keyframes sc-right-nav-pop {
          0%   { opacity: 0; transform: scale(0.55) translateY(-10px); }
          65%  { opacity: 1; transform: scale(1.1) translateY(2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .sc-right-nav {
          position: absolute;
          top: 10vh;
          left: 6vw;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: none;
          z-index: 14;
          transform: translateX(-40px) rotate(-20deg);
          transform-origin: left bottom;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-btn {
          font-family: 'Persona5Main';
          font-size: 100px;
          letter-spacing: 3px;
          line-height: 1;
          user-select: none;
          color: #ffffff;
          -webkit-text-stroke: 2px #0d0d0d;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 6px;
        }
        .sc-right-nav .sc-nav-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: #111;
          margin: 0 10px;
          flex-shrink: 0;
        }
        .sc-right-nav .sc-nav-arrow {
          font-family: 'Persona5Main';
          font-size: 22px;
          color: #d92323;
          display: inline-block;
          user-select: none;
        }
        .sc-right-nav .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-right-nav .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

.sc-main-portrait {
  max-height: 400px;
  object-fit: contain;
}

        /* ── Each bar ── */
        .sc-bar {
          position: relative;
          width: 45vw;
          height: 64px;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          background: #111;
          cursor: pointer;
          pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: 0 6px 24px rgba(13,13,13,0.65);
          z-index: 1;
        }

        /* wrapper holds both the red underlay and the bar */
.sc-bar-outer {
  position: relative;
  width: 350px;
  height: 60px;
  cursor: pointer;    /* FUERZA la manito del mouse */
  pointer-events: auto; /* Asegura que reaccione al hover/click */
  transition: transform 0.2s ease, filter 0.2s ease;
  opacity: 0;         /* Comienza invisible para la animación */
  transform: translateX(-50px);
}
        /* Stagger their rest positions to look wonderfully chaotic and angled */
.sc-bar-outer:nth-child(1).mounted { transform: translateX(10px) rotate(-1deg); }
.sc-bar-outer:nth-child(2).mounted { transform: translateX(-5px) rotate(2deg); }
.sc-bar-outer:nth-child(3).mounted { transform: translateX(15px) rotate(-2deg); }

/* Make the currently highlighted bar aggressively pop outward when active */
.sc-bar-outer.active.mounted {
  transform: translateX(40px) scale(1.04) rotate(1deg);
  z-index: 25; /* Keeps the active bar layered neatly on top of the stack */
}
.sc-bar-outer:hover,
.sc-bar-outer.active {
  transform: scale(1.05) translateX(10px);
        .sc-bar-outer.active .sc-bar     { height: 90px; }
        .sc-bar-outer.active .sc-bar-red { height: 90px; }
        .sc-bar-outer.mounted {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        /* red underlay — peeks out below the bar when active */
        .sc-bar-red {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  background-color: #d92323;
  transition: width 0.2s ease;
}
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        /* white fill — skewed parallelogram on the right 25% */
        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }

        /* shade on the left edge of the white fill */
        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(13,13,13,0.15) 0%, rgba(13,13,13,0) 100%);
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        /* bottom shadow line under each bar */
        .sc-bar::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 6px;
          background: linear-gradient(180deg, rgba(13,13,13,0) 0%, rgba(13,13,13,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* content layout inside each bar */
        .sc-bar-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px 0 20px;
        }

        /* left: role label */
        .sc-role {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          font-family: 'Persona5Main';
          font-size: 50px;
          letter-spacing: -2px;
          color: #ffffff;
          transform: rotate(-30deg);
          user-select: none;
          line-height: 1;
          padding: 0 16px 0 8px;
        }

        /* left: icon + name centered in remaining space */
        .sc-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding-left: 78px;
        }
        .sc-main-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sc-icon {
          font-family: 'Persona5Main';
          font-size: 22px;
          width: 32px;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: rgba(255,255,255,0.25); }

        .sc-label {
          font-family: 'Persona5Main';
          font-size: 28px;
          letter-spacing: 4px;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-label { color: #0d0d0d; }

        /* right: stats group */
        .sc-stats {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-right: 24px;
          flex-shrink: 0;
        }

        .sc-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sc-stat-top {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .sc-stat-tag {
          font-family: 'Persona5Main';
          font-size: 9px;
          letter-spacing: 1.5px;
          padding: 1px 4px;
          border-width: 1px;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Persona5Main';
          font-size: 26px;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 1px;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #0d0d0d; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
        }
        .sc-stat-bar-color {
          height: 3px;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 2px;
          width: 100%;
          background: #0d0d0d;
        }

        /* character portrait */
        .sc-char {
 
          margin-right: 15px;
          position: absolute;
          top: 0;
          left: 110px;
          height: 80%;
          width: auto;
          max-width: 160px;
          object-fit: cover;
          object-position: top;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%);
        }

        /* footer hints */
.sc-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;       /* Altura fija y estricta */
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  z-index: 10;        /* Nivel bajo para que no tape los botones */
  pointer-events: none; /* ¡Clave! El mouse lo atraviesa de forma invisible */
  opacity: 0;
        }
        .sc-footer.mounted { opacity: 1; 
        }
        .sc-footer-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #888;
        }
  .sc-footer-key {
  background: #333;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid #555;
  font-weight: bold;
        }
.sc-bar-red {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 100%;
  background-color: #d92323;
  transition: width 0.2s ease;
}

.sc-bar-outer:hover .sc-bar-red,
.sc-bar-outer.active .sc-bar-red {
  width: 15px; 
}
        .sc-bar-outer:nth-child(1){
    outline:4px solid red !important;
    
    }

    .sc-bar {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.sc-bar-outer.active .sc-bar {
  background: rgba(255, 255, 255, 0.15);
  border-color: #d92323;
}

/* Texto dentro del botón */
.sc-label {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #aaa;
  transition: color 0.2s ease;
}

.sc-bar-outer:hover .sc-label,
.sc-bar-outer.active .sc-label {
  color: #fff;
}

/* Personaje miniatura dentro del botón (opcional si lo usas visualmente) */
.sc-char {
  height: 80%;
  margin-right: 15px;
  pointer-events: none; /* El mouse ignora la imagen y cliquea el botón */
}

/* ==========================================================================
   PANEL REVELADO (Aparece al hacer click)
   ========================================================================== */
.sc-reveal-panel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  width: 60%;
  background: #1a1a1a;
  border: 2px solid #d92323;
  padding: 30px;
  z-index: 100; /* Al frente de absolutamente todo */
  opacity: 0;
  transition: all 0.3s ease;
}

.sc-reveal-panel.mounted {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.sc-reveal-upper-line {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #e0e0e0;
}

.sc-reveal-lower-bar {
  margin-top: 20px;
  border-top: 1px solid #444;
  padding-top: 15px;
  color: #d92323;
  font-weight: bold;
  }

.sc-footer.mounted {
  opacity: 1;
  transition: opacity 0.5s ease;
}

      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              setActive(i);
            }}
            onMouseEnter={() => {
              setActive(i);
            }}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
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
