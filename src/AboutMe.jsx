import React, { useState, useEffect } from "react";

export default function CustomMainMenu() {
  // 1. Define your new clean menu items here
  const menuButtons = [
    { id: "home", label: "START GAME", action: () => alert("Starting game...") },
    { id: "options", label: "OPTIONS", action: () => alert("Opening options...") },
    { id: "quit", label: "QUIT", action: () => alert("Exiting...") }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Trigger mount animation style just like your original code
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Handle Keyboard Navigation (Up, Down, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "Down") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % menuButtons.length);
      } else if (e.key === "ArrowUp" || e.key === "Up") {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + menuButtons.length) % menuButtons.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        menuButtons[activeIndex].action();
      } else if (e.key === "Escape") {
        e.preventDefault();
        console.log("Back pressed");
      }
    };

/* Core Layout Container */
.sc-root {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

/* Button Reset & Layout */
.sc-bar-outer {
  display: flex;
  align-items: center;
  width: 100%;
  background: #111111;
  border: 2px solid #333333;
  padding: 14px 20px;
  color: #aaaaaa;
  font-family: monospace; /* Retro arcade style */
  font-size: 1.1rem;
  letter-spacing: 1px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
}

/* Hover & Active Selection States */
.sc-bar-outer:hover,
.sc-bar-outer.active {
  color: #ffffff;
  background: #1a1a1a;
  border-color: #d92323; /* Matching your red accent color */
  box-shadow: 0 0 10px rgba(217, 35, 35, 0.3);
  transform: translateX(6px); /* Micro-movement feedback */
}

/* Visual Indicator Style */
.sc-indicator {
  font-weight: bold;
  color: #d92323;
  display: inline-block;
  width: 20px;
}

/* Footer Information Styling */
.sc-footer {
  margin-top: 24px;
  padding: 10px 20px;
  border-top: 1px dashed #333333;
}

.sc-footer-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.85rem;
  color: #666666;
  margin-bottom: 6px;
  font-family: monospace;
}

.sc-footer-key {
  color: #d92323;
  background: #222222;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: bold;
}
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="ui-wrapper">
      {/* Main Menu Root */}
      <div className="sc-root" role="navigation" aria-label="Main Menu">
        {menuButtons.map((btn, index) => (
          <button
            key={btn.id}
            type="button"
            className={`sc-bar-outer ${activeIndex === index ? "active" : ""} ${mounted ? "mounted" : ""}`}
            onClick={btn.action}
            onMouseEnter={() => setActiveIndex(index)}
            style={{
              display: "block",
              width: "100%",
              background: "none",
              border: "none",
              padding: "0",
              textAlign: "left",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            <div className="sc-bar">
              <div className="sc-bar-content">
                <div className="sc-main">
                  <div className="sc-main-top">
                    {/* Visual Indicator Prefix */}
                    <span className="sc-indicator" style={{ marginRight: "10px" }}>
                      {activeIndex === index ? "> " : "  "}
                    </span>
                    <span className="sc-label">{btn.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Retro UI Footer Context */}
      <div className={`sc-footer ${mounted ? "mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>REVEAL</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
