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
        {/* ELIMINADO DE AQUÍ Y MOVIDO ABAJO */}
        <div className="sc-info-bar">
          {/* NUEVA POSICIÓN: Dentro de la barra y antes del ícono */}
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
