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

/* Capa oscura que se activa al revelar contenido */
.sc-dim {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  z-index: 40; /* Por encima de los botones, por debajo del panel */
  backdrop-filter: blur(4px);
}

/* ==========================================================================
   2. BOTONES DEL MENÚ (Aquí arreglamos el problema del tercer botón)
   ========================================================================== */
.sc-root {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 40px;
  max-width: 500px;
  /* El z-index bajo permite que el panel de revelado se ponga encima cuando se active */
  z-index: 40; 
}

.sc-bar-outer {
  position: relative;
  cursor: pointer; /* Fuerza la aparición de la manito del mouse */
  pointer-events: auto; /* Asegura que el mouse no ignore este elemento */
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translateX(-50px);
  transition: transform 0.4s ease, opacity 0.4s ease, scale 0.2s ease;
}

/* Animación de entrada cuando el componente se monta */
.sc-bar-outer.mounted {
  opacity: 1;
  transform: translateX(0);
}

/* Efecto Hover y Activo */
.sc-bar-outer:hover,
.sc-bar-outer.active {
  scale: 1.03;
}

/* Barra decorativa roja de la izquierda */
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

/* Cuerpo del botón */
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

.sc-bar-outer.active .sc-bar {
  background: rgba(45, 52, 64, 0.9);
  border-color: #d92323;
}

/* Miniatura del personaje dentro del botón */
.sc-char {
  height: 80%;
  object-fit: contain;
  margin-right: 15px;
  z-index: 2;
}

.sc-bar-content {
  z-index: 2;
}

.sc-label {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 2px;
}

/* ==========================================================================
   3. PANEL DE REVELADO (Aparece al hacer Click/Enter)
   ========================================================================== */
.sc-reveal-panel {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 60%;
  background: rgba(20, 22, 26, 0.95);
  border-left: 5px solid #d92323;
  padding: 30px;
  z-index: 30; /* Por encima del dim y de los botones */
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  pointer-events:non;
}

.sc-reveal-panel.mounted {
  opacity: 1;
  transform: translateY(0);
}

.sc-reveal-upper-line {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 8px;
}

.sc-reveal-lower-bar {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: #8a929e;
  font-size: 0.9rem;
}

/* Retrato grande del personaje revelado */
.sc-main-portrait-shell {
  position: absolute;
  right: 5%;
  bottom: 10%;
  width: 30%;
  height: 70%;
  z-index: 25; /* Detrás del texto pero delante del fondo */
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.5s ease;
  pointer-events:non;
}

.sc-main-portrait-shell.mounted {
  opacity: 1;
  transform: scale(1);
}

.sc-main-portrait {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Navegación secundaria derecha */
.sc-right-nav {
  position: absolute;
  right: 5%;
  top: 5%;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 30;
}

/* ==========================================================================
   4. FOOTER (Arreglado para que no tape hacia arriba)
   ========================================================================== */
.sc-footer {
  position: relative; /* Cambiado a relative para que no flote encima de los botones */
  width: 100%;
  padding: 20px 40px;
  display: flex;
  gap: 30px;
  background: rgba(15, 17, 21, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 5; /* Z-index bajo para que NUNCA bloquee los clics del menú */
  box-sizing: border-box;
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
