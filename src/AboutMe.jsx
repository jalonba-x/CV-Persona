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
