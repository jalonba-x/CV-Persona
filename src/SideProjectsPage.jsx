import { useEffect, useState, useRef } from "react";
import { playSelectSound } from "./utils/audio.js";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  {
    id: "Fanbook editing and translation",
    title: "Digital Monster Catalog",
    stack: "Adobe InDesign",
    summary: "A fan-made, multilingual archival book detailing the debut of all Digimon from 1997 to 2026",
    href: "https://jalonba.itch.io/digital-monster-catalog",
  },
  {
    id: "Persona5-themed resume",
    title: "Persona5-themed resume",
    stack: "Github",
    summary: "An optimized version of @ffaneto's persona5-website from Github",
    href: "https://github.com/jalonba-x/CV-Persona",
  },
  {
    id: "Fan video edition",
    title: "Tribute to HxH 134 (miniature rose)",
    stack: "Adobe Premiere",
    summary: "An edited anime scene using real life images instead",
    href: "https://www.youtube.com/watch?v=95LTGvaMmOg&t",
  }
];

export default function SideProjectsPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isFirstRenderAudio = useRef(true);

  useEffect(() => {
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
    }
    playSelectSound();
  }, [active]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate]);

  return (
    <div id="menu-screen">
      <style>{`
        .sp-shell {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: grid;
          grid-template-columns: 48% 52%;
          gap: 1.5cqw;
          /* Desktop default: max(150px, 16vh) pushes panels below widescreen PC headers */
          padding-top: max(150px, 16vh);
          padding-right: 3.5cqw;
          padding-bottom: 4cqh;
          padding-left: 3.5cqw;
          box-sizing: border-box;
        }

        .sp-left {
          display: flex;
          flex-direction: column;
          gap: 1.1cqh;
        }

        .sp-title {
          font-family: 'Persona5Main', sans-serif;
          font-size: 3.75cqw;
          color: #ffffff;
          line-height: 0.92;
          letter-spacing: 0.05cqw;
          text-shadow: 0 0.2cqh 0 rgba(13,13,13,0.3);
          margin-bottom: 0.75cqh;
          opacity: 0;
          transform: translateX(-1.25cqw);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .sp-title.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .title-mobile {
          display: none;
        }

        .sp-item {
          position: relative;
          min-height: 8.7cqh;
          background: rgba(13,13,13,0.94);
          clip-path: polygon(0 0, 100% 0, calc(100% - 0.7cqw) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.14), 0 0.75cqh 1.5cqh rgba(13,13,13,0.35);
          padding: 1.3cqh 0.8cqw;
          cursor: pointer;
          opacity: 0;
          transform: translateX(-1.8cqw);
          transition: transform 0.24s ease, background 0.24s ease, opacity 0.4s ease;
        }
        .sp-item.mounted {
          opacity: 1;
          transform: translateX(0);
        }
        .sp-item.active {
          background: rgba(255, 255, 255, 0.97);
          transform: translateX(0.3cqw);
        }

        .sp-item-title {
          font-family: 'Persona5Main', sans-serif;
          letter-spacing: -0.8cqw;
          font-size: 2.2cqw;
          line-height: 0.9;
          color: #ffffff;
        }
        .sp-item.active .sp-item-title {
          color: #111;
        }

        .sp-item-stack {
          font-family: 'Persona5Main', sans-serif;
          font-size: 1.35cqw;
          letter-spacing: 0.07cqw;
          color: #ffffff;
          margin-top: 0.37cqh;
        }
        .sp-item.active .sp-item-stack {
          color: #0d0d0d;
        }

        .sp-right {
          position: relative;
          background: linear-gradient(180deg, rgba(13,13,13,0.96) 0%, rgba(13,13,13,0.96) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 0.9cqw) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16), 0.6cqw 1.1cqh 0 rgba(13,13,13,0.5);
          padding: 2.2cqh 1.5cqw;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sp-tag {
          display: inline-block;
          font-family: 'Persona5Main', sans-serif;
          font-size: 1.25cqw;
          letter-spacing: 0.08cqw;
          background: #ffffff;
          color: #0d0d0d;
          padding: 0.37cqh 0.5cqw;
          clip-path: polygon(0 0, 100% 0, calc(100% - 0.4cqw) 100%, 0 100%);
        }

        .sp-right-title {
          font-family: 'Persona5Main', sans-serif;
          letter-spacing: -0.5cqw;
          font-size: 3.3cqw;
          line-height: 0.95;
          color: #ffffff;
          margin-top: 1.5cqh;
        }

        .sp-right-summary {
          margin-top: 1.5cqh;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2cqw;
          line-height: 1.05;
          letter-spacing: 0.05cqw;
          color: #ffffff;
        }

        .sp-link {
          margin-top: 2.6cqh;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.45cqw;
          letter-spacing: 0.05cqw;
          color: #ffffff;
          background: #d92323;
          display: inline-flex;
          align-items: center;
          padding: 0.75cqh 0.9cqw;
          clip-path: polygon(0 0, 100% 0, calc(100% - 0.5cqw) 100%, 0 100%);
          text-decoration: none;
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
        }
        .sp-link:hover {
          background: #ffffff;
          color: #0d0d0d;
          transform: translateX(0.3cqw) scale(1.02);
          box-shadow: -0.3cqw 0 0 #d92323;
        }

        .sp-footer {
          position: absolute;
          right: 1.5cqw;
          bottom: 1.8cqh;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.4cqh;
          font-family: 'Persona5Main', sans-serif;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.1cqw;
          font-size: 0.65cqw;
        }

        /* =========================================================
           COMPACT / MOBILE OPTIMIZATIONS (Landscape & Portrait)
           Triggers on narrow phone widths OR short landscape heights
           ========================================================= */
        @media (max-width: 850px), (max-height: 550px) {
          .sp-shell {
            /* Guarantees content sits strictly between top BACK button and bottom BGM button */
            padding-top: max(80px, calc(env(safe-area-inset-top) + 65px));
            padding-bottom: max(60px, calc(env(safe-area-inset-bottom) + 45px));
            padding-left: max(20px, 4vw);
            padding-right: max(20px, 4vw);
            gap: 12px;
            align-content: center; /* Centering mirrors the balanced vertical spacing of the desktop web layout */
          }

          .sp-left {
            gap: 6px;
            justify-content: center;
          }

          /* Switches title text to "PROJECTS" on a single line */
          .title-desktop {
            display: none;
          }
          .title-mobile {
            display: inline;
          }

          .sp-title {
            font-size: 18px;
            margin-bottom: 4px;
            letter-spacing: 1px;
          }

          /* Scaled down item bars to prevent vertical overflowing */
          .sp-item {
            min-height: 38px;
            padding: 6px 10px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 6px) 100%, 0 100%);
          }

          .sp-item-title {
            font-size: 14px;
            line-height: 1;
            letter-spacing: -0.3px;
          }

          .sp-item-stack {
            font-size: 10px;
            margin-top: 2px;
            letter-spacing: 0.5px;
          }

          /* Detail panel scaled proportionally to match the height of the 3 left bars */
          .sp-right {
            padding: 12px 14px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
            max-height: calc(100vh - 140px);
            justify-content: center;
          }

          .sp-tag {
            font-size: 10px;
            padding: 2px 6px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%);
          }

          .sp-right-title {
            font-size: 16px;
            margin-top: 6px;
            line-height: 1.05;
            letter-spacing: -0.3px;
          }

          .sp-right-summary {
            font-size: 12px;
            margin-top: 6px;
            line-height: 1.15;
          }

          .sp-link {
            font-size: 12px;
            padding: 5px 10px;
            margin-top: 10px;
            clip-path: polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0 100%);
          }

          .sp-footer {
            display: none;
          }
        }

        /* Portrait mode adjustment: stacks left list and right panel vertically */
        @media (max-width: 768px) and (orientation: portrait) {
          .sp-shell {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            align-content: start;
            padding-top: max(80px, calc(env(safe-area-inset-top) + 65px));
            padding-bottom: max(70px, calc(env(safe-area-inset-bottom) + 60px));
            gap: 14px;
            overflow-y: auto;
          }
          .sp-left {
            gap: 6px;
          }
          .sp-item {
            min-height: 42px;
            padding: 8px 12px;
          }
          .sp-item-title {
            font-size: 15px;
          }
          .sp-item-stack {
            font-size: 11px;
          }
          .sp-right {
            max-height: none;
            padding: 14px;
          }
          .sp-right-title {
            font-size: 18px;
          }
          .sp-right-summary {
            font-size: 13px;
          }
          .sp-link {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="sp-shell">
        <div className="sp-left">
          <div className={`sp-title${mounted ? " mounted" : ""}`}>
            <span className="title-desktop">PROJECT LOG</span>
            <span className="title-mobile">PROJECTS</span>
          </div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`sp-item${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="sp-item-title">{item.title}</div>
              <div className="sp-item-stack">{item.stack}</div>
            </div>
          ))}
        </div>

        <div className="sp-right">
          <div className="sp-tag">DETAILS</div>
          <div className="sp-right-title">{ITEMS[active].title}</div>
          <div className="sp-right-summary">{ITEMS[active].summary}</div>
          
          <a 
            className="sp-link" 
            href={ITEMS[active].href} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            OPEN LINK: {ITEMS[active].href.replace("https://", "")}
          </a>
        </div>
      </div>

      <div className="sp-footer">
        <div>UP / DOWN SELECT</div>
        <div>ESC BACK</div>
      </div>
    </div>
  );
}
