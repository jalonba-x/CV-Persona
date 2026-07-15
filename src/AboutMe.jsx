import React, { useState, useEffect } from "react";

export default function CustomMainMenu() {
  const menuButtons = [
    { 
      id: "projects", 
      label: "MY WORKS", 
      action: () => { window.location.href = "/projects"; } 
    },
    { 
      id: "github", 
      label: "OPEN GITHUB", 
      action: () => { window.open("https://github.com", "_blank"); } 
    },
    { 
      id: "contact", 
      label: "CONTACT ME", 
      action: () => { window.location.href = "mailto:hello@example.com"; } 
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  // --- REVISED INLINE STYLES ---
  const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    position: "relative", // Ensures it creates a localized stacking context
    zIndex: 10,           // Pushes the entire menu forward over hidden layouts
  };

  const getButtonStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",          // Forces element to span full width
    minHeight: "50px",      // Guarantees a solid layout footprint
    background: isActive ? "#1a1a1a" : "#111111",
    border: isActive ? "2px solid #d92323" : "2px solid #333333",
    padding: "14px 20px",
    color: isActive ? "#ffffff" : "#aaaaaa",
    fontFamily: "monospace",
    fontSize: "1.1rem",
    letterSpacing: "1px",
    cursor: "pointer",      // Guarantees the mouse "pointer hand" icon
    textAlign: "left",
    borderRadius: "4px",
    transform: isActive ? "translateX(6px)" : "translateX(0)",
    boxShadow: isActive ? "0 0 10px rgba(217, 35, 35, 0.3)" : "none",
    transition: "all 0.2s ease-in-out",
    position: "relative",   
    zIndex: 12,             // Raises individual items above background rows
    pointerEvents: "auto",  // Forces mouse inputs to register over all space
  });

  const labelSpanStyle = {
    pointerEvents: "none",  // Prevents internal text tags from stealing mouse target focus
    flexGrow: 1,            // Stretches text zone layout to the end of the line
  };

  const indicatorStyle = {
    fontWeight: "bold",
    color: "#d92323",
    display: "inline-block",
    width: "25px",
    pointerEvents: "none",  // Prevents icon from blocking mouse hit detection
  };

  const footerStyle = {
    marginTop: "24px",
    padding: "10px 20px",
    borderTop: "1px dashed #333333",
    position: "relative",
    zIndex: 10,
  };

  const footerRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "0.85rem",
    color: "#666666",
    marginBottom: "6px",
    fontFamily: "monospace",
  };

  const footerKeyStyle = {
    color: "#d92323",
    background: "#222222",
    padding: "2px 6px",
    borderRadius: "3px",
    fontWeight: "bold",
  };

  return (
    <div className="ui-wrapper" style={{ position: "relative", zIndex: 5 }}>
      <div style={rootStyle} role="navigation" aria-label="Main Navigation Menu">
        {menuButtons.map((btn, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={btn.id}
              type="button"
              style={getButtonStyle(isActive)}
              onClick={btn.action}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span style={indicatorStyle}>
                {isActive ? "▶" : " "}
              </span>
              <span style={labelSpanStyle}>{btn.label}</span>
            </button>
          );
        })}
      </div>

      <div style={footerStyle}>
        <div style={footerRowStyle}>
          <span style={footerKeyStyle}>↑↓</span>
          <span>SELECT</span>
        </div>
        <div style={footerRowStyle}>
          <span style={footerKeyStyle}>↵</span>
          <span>REVEAL</span>
        </div>
      </div>
    </div>
  );
}
