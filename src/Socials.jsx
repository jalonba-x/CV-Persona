import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { playSelectSound } from "./utils/audio.js";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import bgVideo from "./assets/main1.mp4";
import newsign from "./assets/newsign.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "X", label: "X (TWITTER)", handle: "@jalonba", href: "https://x.com/Jalonba", icon: "𝕏", barIcon: icon1, bars: 1, newBars: [0], counts: ["76"],
    titles: ["HxH diagram"],
    links: ["https://x.com/Jalonba/status/2071343110416728201"],
    stats: [
      { tag: "FOL", value: "170", color: "#9147ff" },
    ],
  },
  {
    id: "instagram", label: "INSTAGRAM", handle: "@tamer.jb_tcg", href: "https://instagram.com/tamer.jb_tcg", icon: <span style={{ position: "relative", top: "-3px" }}>📷</span>, barIcon: icon2, bars: 1, newBars: [0], counts: ["48"],
    titles: ["Digimon card"],
    links: ["https://instagram.com/p/ChfplqFPmcf/"],
    stats: [
      { tag: "FOL", value: "425", color: "#e1306c" },
      { tag: "PST", value: "34",  color: "#f77737" },
    ],
  },
  {
    id: "LinkedIn", label: "LinkedIn", handle: "@javierbarrerab", href: "https://www.linkedin.com/in/javierbarrerab/", icon: <span style={{ position: "relative", top: "-3px" }}>💼</span>, barIcon: icon3, bars: 1, newBars: [0], counts: ["17"],
    titles: ["Position update"],
    links: ["https://www.linkedin.com/feed/update/urn:li:ugcPost:7007173080699523072/"],
    stats: [
      { tag: "CON", value: "203", color: "#00f2ea" },
    ],
  },
];

export default function Socials() {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left");
  const navigate = useNavigate();
  const isFirstRenderAudio = useRef(true);

  useEffect(() => {
    if (isFirstRenderAudio.current) {
      isFirstRenderAudio.current = false;
      return;
        }
    playSelectSound();
  }, [active]);
  
  const isMobileViewport =
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  const openExternalLink = (url) => {
    const targetUrl = url.startsWith("http") ? url : "https://" + url;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp")    setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown")  setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter")      openExternalLink(ITEMS[active].href);
      } else {
        const barCount = ITEMS[active].bars;
        if (e.key === "ArrowUp")   setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter")     openExternalLink(ITEMS[active].links[activeInfoBar]);
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus, activeInfoBar]);

  return (
    <div id="menu-screen">
      <video src={bgVideo} autoPlay loop muted playsInline />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,700;1,700&display=swap');

#menu-screen {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  max-width: none !important;
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  outline: none !important;
}

#menu-screen::before,
#menu-screen::after {
  display: none !important;
}

.sc-dim {
  position: fixed !important;
  inset: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
}
        .sc-root {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 1.8cqh;
          padding-left: 0;
          left: 4.5cqw;
        }

        .sc-bar {
          position: relative;
          width: 45cqw;
          height: 6.5cqh;
          transition: height 0.3s cubic-bezier(0.22,1,0.36,1);
          cursor: pointer;
          pointer-events: all;
          z-index: 1;
        }

        .sc-bar-bg {
          position: absolute;
          inset: 0;
          background: #111;
          clip-path: polygon(0 0, 100% 0, calc(100% - 0.75cqw) 100%, 0 100%);
          box-shadow: 0 0.6cqh 2.4cqh rgba(0,0,0,0.65);
          z-index: 0;
        }

        .sc-bar-outer {
          position: relative;
          flex-shrink: 0;
          transform: translateX(-100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
        }

        .sc-bar-outer.active { z-index: 20; }
        .sc-bar-outer.active .sc-bar      { height: 9cqh; }
        .sc-bar-outer.active .sc-bar-red { height: 9cqh; }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar-outer:nth-child(1) { transition-delay: 0ms; }
        .sc-bar-outer:nth-child(2) { transition-delay: 80ms; }
        .sc-bar-outer:nth-child(3) { transition-delay: 160ms; }

        .sc-bar-red {
          position: absolute;
          top: 0; left: 0;
          width: 45cqw;
          height: 6.5cqh;
          background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 0.55cqw) 100%);
          transform: translateY(-0.7cqh);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; }

        .sc-bar-fill {
          position: absolute;
          inset: 0;
          width: 100%;
          background: #ffffff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 1.75cqw) 100%, calc(100% - 1.75cqw) 100%);
          transition: clip-path 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 0.75cqw) 100%, calc(22% + 7.5cqw) 100%);
        }

        .sc-bar-shade {
          position: absolute;
          top: 0; bottom: 0;
          left: 73%;
          width: 6%;
          background: linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 100%);
          z-index: 2;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-shade { opacity: 1; }

        .sc-bar-bg::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 0.6cqh;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
          z-index: 10;
          pointer-events: none;
        }

        .sc-bar-content {
          position: relative;
          z-index: 4;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.1cqw 0 0;
        }

        .sc-role {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 7cqw;
          flex-shrink: 0;
          font-family: 'Anton', sans-serif;
          font-size: 1.6cqw;
          letter-spacing: 0.05cqw;
          color: #ffffff;
          transform: translate(-0.4cqw) rotate(-15deg);
          transform-origin: center right;
          user-select: none;
          line-height: 1;
          margin-left: 0.55cqw;
          transition: font-size 0.3s cubic-bezier(0.22,1,0.36,1), transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .sc-bar-outer.active .sc-role {
          font-size: 2.2cqw;
          transform: translateY(-0.4cqh) rotate(-15deg) scale(1.03);
        }
.sc-main {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          height: 100%;
        }
      .sc-main-top {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 0.65cqw;
          white-space: nowrap;
          transition: left 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
.sc-bar-outer.active .sc-main-top {
          left: 78%;
          transform: translateX(calc(-100% - 0.5cqw)); 
        }
.sc-icon {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2cqw;
          width: 1.75cqw;
          text-align: center;
          flex-shrink: 0;
          color: rgba(255,255,255,0.15);
          transition: color 0.2s ease;
          user-select: none;
        }
        .sc-bar-outer.active .sc-icon { color: #111111; }

        .sc-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.55cqw;
          letter-spacing: 0.22cqw;
          line-height: 1;
          color: rgba(255,255,255,0.85);
          transition: color 0.2s ease;
          user-select: none;
          display: flex;
          align-items: center;
          gap: 0.5cqw;
        }
        .sc-bar-outer.active .sc-label { color: #111111; }

        .sc-link-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.18);
          color: #ffffff;
          padding: 0.4cqh 0.5cqw;
          border-radius: 0.15cqw;
          border: none;
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease, color 0.18s ease, box-shadow 0.18s ease;
          pointer-events: auto;
        }
        .sc-bar-outer.active .sc-link-btn {
          background: #d92323;
          color: #ffffff;
          box-shadow: 0 0 8px rgba(217, 35, 35, 0.5);
        }
        .sc-link-btn:hover {
          background: #ffffff !important;
          color: #000000 !important;
          transform: scale(1.15);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .sc-ext-icon {
          width: 1.1cqw;
          height: 1.1cqw;
          min-width: 14px;
          min-height: 14px;
          stroke: currentColor;
          transition: transform 0.2s ease;
        }

        .sc-link-btn:hover .sc-ext-icon {
          transform: translate(1px, -1px);
        }

        @keyframes sc-arrow-left {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(-0.3cqw); opacity: 0.4; }
        }
        @keyframes sc-arrow-right {
          0%, 100% { transform: translateX(0); opacity: 1; }
          50%       { transform: translateX(0.3cqw); opacity: 0.4; }
        }
        .sc-nav-btn {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 5.5cqw;
          letter-spacing: 0.16cqw;
          color: #fff;
          -webkit-text-stroke: 0.1cqw #000;
          paint-order: stroke fill;
          background: none;
          border: none;
          padding: 0 0.3cqw;
          line-height: 1;
          user-select: none;
        }
        .sc-nav-arrow {
          font-size: 1.2cqw;
          color: #c4001a;
          display: inline-block;
        }
        .sc-nav-arrow.left  { animation: sc-arrow-left  0.8s ease-in-out infinite; }
        .sc-nav-arrow.right { animation: sc-arrow-right 0.8s ease-in-out infinite; }

        .sc-stats {
          display: flex;
          align-items: center;
          gap: 0.55cqw;
          padding-right: 1.3cqw;
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
          gap: 0.2cqw;
        }

        .sc-stat-tag {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.5cqw;
          letter-spacing: 0.08cqw;
          padding: 0.05cqh 0.2cqw;
          border-width: 0.05cqw;
          border-style: solid;
          line-height: 1.4;
          user-select: none;
        }

        .sc-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4cqw;
          font-style: italic;
          line-height: 1;
          color: #ffffff;
          letter-spacing: 0.05cqw;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-bar-outer.active .sc-stat-num { color: #111111; }

        .sc-stat-bars {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.1cqh;
          margin-top: 0.2cqh;
        }
        .sc-stat-bar-color {
          height: 0.3cqh;
          width: 100%;
        }
        .sc-stat-bar-black {
          height: 0.2cqh;
          width: 100%;
          background: #000;
        }

        .sc-char {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 7cqw;
          height: 100%;
          width: 8.8cqw;
          object-fit: cover;
          object-position: right center;
          pointer-events: none;
          z-index: 3;
          clip-path: polygon(0.75cqw 0, 100% 0, calc(100% - 0.75cqw) 100%, 0 100%);
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1), left 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .sc-bar-outer.active .sc-char {
          width: 10cqw;
          left: 7.3cqw;
        }

        .sc-right-nav {
          position: absolute;
          top: 3.7cqh;
          right: 2.2cqw;
          display: flex;
          align-items: center;
          gap: 0.35cqw;
          pointer-events: none;
          z-index: 50;
          animation: sc-right-nav-pop 0.38s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-right-nav .sc-nav-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.55cqw;
          letter-spacing: 0.16cqw;
          line-height: 1;
          user-select: none;
          color: #000;
          background: rgba(255, 255, 255, 0.88);
          padding: 0.35cqh 0.85cqw;
          border-radius: 0.2cqw;
          box-shadow: 0 0.4cqh 1.2cqh rgba(0, 0, 0, 0.35);
        }

        .sc-info-panel {
          position: absolute;
          top: 12.2cqh;
          right: 0;
          left: 65cqw;
          bottom: 7.8cqh;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 0.6cqh;
          padding: 0.75cqh 0.75cqw 0.75cqh 0;
          overflow-y: auto;
          overflow-x: hidden;
          pointer-events: none;
        }

        @keyframes sc-infobar-in {
          0%   { opacity: 0; transform: translateX(2.2cqw); }
          60%  { opacity: 1; transform: translateX(-0.2cqw); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .sc-info-bar-wrap {
          position: relative;
          right: auto;
          left: auto;
          width: 100%;
          height: 4.3cqh;
          background: transparent;
          pointer-events: all;
          cursor: pointer;
          z-index: 1;
          padding: 0;
          animation: sc-infobar-in 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sc-info-bar-wrap.selected {
          background: #111;
          padding: 0.15cqw;
          border-radius: 0.4cqw;
        }
        .sc-info-bar {
          position: relative;
          width: 100%;
          height: 100%;
          background: transparent;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .sc-info-bar-wrap.selected .sc-info-bar {
          background: #fff;
          border-radius: 0.35cqw;
        }
        .sc-info-bar-new {
          position: relative;
          height: 60%;
          width: auto;
          margin-left: 0.75cqw;
          margin-right: 0.1cqw;
          pointer-events: none;
          z-index: 5;
          flex-shrink: 0;
          object-fit: contain;
        }
        .sc-info-bar-new + .sc-info-bar-icon {
          margin-left: 0.3cqw;
        }
        .sc-info-bar-wrap.selected .sc-info-bar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 0.4cqh;
          background: #c4001a;
          z-index: 1;
        }
        .sc-info-bar-text {
          flex: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2cqw;
          letter-spacing: 0.1cqw;
          color: #ffffff;
          padding: 0 0.75cqw;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-info-bar-wrap.selected .sc-info-bar-text {
          color: #111;
        }
        .sc-info-bar-box {
          height: 70%;
          background: #000;
          display: flex;
          align-items: center;
          padding: 0 0.65cqw;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1cqw;
          letter-spacing: 0.05cqw;
          color: #fff;
          flex-shrink: 0;
          border-radius: 0.3cqw;
          margin-right: 0.2cqw;
          user-select: none;
        }

        .sc-info-bar-icon {
          height: 55%;
          width: auto;
          flex-shrink: 0;
          margin-left: 0.75cqw;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        .sc-info-bar-count {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2cqw;
          letter-spacing: 0.05cqw;
          color: #ffffff;
          margin-right: 4.2cqw;
          flex-shrink: 0;
          user-select: none;
          transition: color 0.2s ease;
        }
        .sc-info-bar-wrap.selected .sc-info-bar-count {
          color: #111;
        }

        .sc-footer {
          position: absolute;
          bottom: 2.5cqh; right: 1.6cqw;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 0.5cqh;
          font-family: 'Bebas Neue', sans-serif;
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease 0.6s;
        }
        .sc-footer.mounted { opacity: 1; }
        .sc-footer-row {
          display: flex; align-items: center; gap: 0.4cqw;
          font-size: 0.72cqw; letter-spacing: 0.1cqw;
          color: rgba(255,255,255,0.22);
        }
        .sc-footer-key {
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 0.16cqw;
          padding: 0.1cqh 0.3cqw; font-size: 0.6cqw;
        }

        .sc-mobile-controls {
          display: none;
        }

        .sc-mobile-btn {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(0, 0, 0, 0.62);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.2px;
          font-size: 13px;
          padding: 7px 12px;
          border-radius: 8px;
          min-width: 84px;
        }

        @media (max-width: 768px) {
          .sc-root {
            justify-content: flex-start;
            padding-top: 12px;
            gap: 6px;
          }

          .sc-link-btn {
            padding: 4px 8px;
          }

          .sc-ext-icon {
            width: 16px;
            height: 16px;
          }

          .sc-info-panel {
            top: min(47vh, 320px);
            left: 8px;
            right: 8px;
            bottom: 58px;
            gap: 4px;
            padding: 4px 0;
          }

          .sc-info-bar-wrap {
            height: 38px !important;
          }

          .sc-info-bar-text {
            font-size: 15px;
            letter-spacing: 1px;
          }

          .sc-info-bar-count {
            margin-right: 10px;
            font-size: 14px;
          }

          .sc-footer {
            display: none;
          }

          .sc-mobile-controls {
            position: fixed;
            left: 8px;
            right: 8px;
            bottom: max(8px, env(safe-area-inset-bottom));
            z-index: 60;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            pointer-events: all;
          }
        }
      `}</style>

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <div className="sc-bar-bg" />
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">
                      <span>{item.label}</span>
                      <button
                        type="button"
                        className="sc-link-btn"
                        title={`Open ${item.label}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openExternalLink(item.href);
                        }}
                      >
                        <svg className="sc-ext-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div className="sc-stat" key={s.tag}>
                      <div className="sc-stat-top">
                        <span className="sc-stat-tag" style={{ color: s.color, borderColor: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num">{s.value}</span>
                      </div>
                      <div className="sc-stat-bars">
                        <div className="sc-stat-bar-color" style={{ background: s.color }} />
                        <div className="sc-stat-bar-black" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span className="sc-nav-arrow left">◄</span>
          <span className="sc-nav-btn">LB</span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span className="sc-nav-btn">RB</span>
          <span className="sc-nav-arrow right">►</span>
        </div>
      )}

      {mounted && (
        <div className="sc-info-panel" key={`panel-${active}`}>
          {Array.from({ length: ITEMS[active].bars }).map((_, i) => (
            <div
              className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
              key={`bar-${active}-${i}`}
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => {
                if (isMobileViewport || activeInfoBar === i) {
                  openExternalLink(ITEMS[active].links[i]);
                  return;
                }
                setActiveInfoBar(i);
              }}
              onMouseEnter={() => setActiveInfoBar(i)}
            >
              <div className="sc-info-bar">
                {ITEMS[active].newBars.includes(i) && (
                  <img className="sc-info-bar-new" src={newsign} alt="New" />
                )}
                <img className="sc-info-bar-icon" src={ITEMS[active].barIcon} alt="" />
                <span className="sc-info-bar-text">{ITEMS[active].titles[i]}</span>
                <span className="sc-info-bar-box">VIEWS</span>
                <span className="sc-info-bar-count">{ITEMS[active].counts[i]}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OPEN</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <div className="sc-mobile-controls" aria-label="Socials mobile controls">
        <button className="sc-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
        <button
          className="sc-mobile-btn"
          type="button"
          onClick={() => openExternalLink(ITEMS[active].href)}
        >
          OPEN
        </button>
      </div>
    </div>
  );
}
