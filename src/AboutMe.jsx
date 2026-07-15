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

  // --- CRITICAL FIX: FORCED FOREGROUND LAYOUT STYLES ---
  const wrapperStyle = {
    position: "relative",
    zIndex: 9999,          // Forces entire component above any video overlays
    isolation: "isolate",  // Prevents parent containers from flattening the layer depth
    width: "100%",
  };

  const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    position: "relative", 
    zIndex: 9999,          // Keeps menu controls forward
  };

  const getButtonStyle = (isActive) => ({
    display: "flex",
    alignItems: "center",
    width: "100%",          
    minHeight: "54px",      
    background: isActive ? "#1a1a1a" : "#111111",
    border: isActive ? "2px solid #d92323" : "2px solid #333333",
    padding: "14px 20px",
    color: isActive ? "#ffffff" : "#aaaaaa",
    fontFamily: "monospace",
    fontSize: "1.1rem",
    letterSpacing: "1px",
    cursor: "pointer",      
    textAlign: "left",
    borderRadius: "4px",
    transform: isActive ? "translateX(6px)" : "translateX(0)",
    boxShadow: isActive ? "0 0 10px rgba(217, 35, 35, 0.3)" : "none",
    transition: "all 0.15s ease-in-out",
    position: "relative",   
    zIndex: 10000,          // Guarantees surface exposure to mouse engine
    pointerEvents: "auto",  // Commands browser to capture all clicks here
  });

  const labelSpanStyle = {
    pointerEvents: "none",  
    flexGrow: 1,            
  };

  const indicatorStyle = {
    fontWeight: "bold",
    color: "#d92323",
    display: "inline-block",
    width: "25px",
    pointerEvents: "none",  
  };

  const footerStyle = {
    margin: "24px auto 0 auto",
    padding: "10px 20px",
    borderTop: "1px dashed #333333",
    maxWidth: "400px",
    position: "relative",
    zIndex: 9999,
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
    <div className="ui-wrapper" style={wrapperStyle}>
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
