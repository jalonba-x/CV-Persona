import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import P5Menu from './P5Menu'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import SideProjectsPage from './SideProjectsPage'
import mainVideo from './assets/main1.mp4'
import './App.css'

const BGM_STATE_KEY = 'p5-bgm-enabled'
const BGM_VOLUME_KEY = 'p5-bgm-volume'
const DEFAULT_VOLUME = 0.45
const FADE_MS = 450

function useTouchGestures() {
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;
    const DRAG_THRESHOLD = 10;   

    const onTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      isDragging = false;
    };

    const onTouchMove = (e) => {
      const currentX = e.changedTouches[0].screenX;
      const currentY = e.changedTouches[0].screenY;
      const distance = Math.hypot(currentX - touchStartX, currentY - touchStartY);
      
      if (distance > DRAG_THRESHOLD) {
        isDragging = true;
      }
    };

    const onClickCapture = (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        isDragging = false;
        return false;
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('click', onClickCapture, true);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('click', onClickCapture, true);
    };
  }, []);
}

    const onTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      if (Math.abs(deltaX) < MIN_SWIPE_DISTANCE && Math.abs(deltaY) < MIN_SWIPE_DISTANCE) {
        return;
      }

      let keyToDispatch = null;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          keyToDispatch = 'ArrowLeft'; // Swipe Right -> Go Back
        } else {
          keyToDispatch = 'Enter';     // Swipe Left -> Select / Forward
        }
      }

      if (keyToDispatch) {
        if (document.activeElement && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        window.dispatchEvent(new KeyboardEvent('keydown', { key: keyToDispatch, bubbles: true }));
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    
    window.addEventListener('click', onClickCapture, true);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('click', onClickCapture, true);
    };
  }, []);
}

function BackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  // Do not render on the main menu
  if (location.pathname === '/') return null;

  return (
    <div className="back-btn-wrapper">
      <style>{`
        .back-btn-wrapper {
          position: fixed;
          top: 24px;
          left: 24px;
          z-index: 10000;
          pointer-events: all;
        }

        .p5-back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #d92323;
          color: #ffffff;
          border: none;
          padding: 10px 20px 10px 14px;
          font-family: 'Persona5Main', 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 2px;
          cursor: pointer;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
          box-shadow: 4px 4px 0px #000000;
          transition: transform 0.15s ease, background-color 0.15s ease;
        }

function BackgroundMusic() {
  const audioRef = useRef(null)
  const fadeRafRef = useRef(null)
  const autoStartRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(() => {
    const saved = Number(localStorage.getItem(BGM_VOLUME_KEY))
    if (Number.isFinite(saved)) return Math.min(1, Math.max(0, saved))
    return DEFAULT_VOLUME
  })

  const stopFade = () => {
    if (fadeRafRef.current) {
      cancelAnimationFrame(fadeRafRef.current)
      fadeRafRef.current = null
    }
  }

  const fadeTo = (target, done) => {
    const audio = audioRef.current
    if (!audio) return

    stopFade()
    const start = audio.volume
    const diff = target - start
    const begin = performance.now()

    const tick = (now) => {
      const p = Math.min(1, (now - begin) / FADE_MS)
      audio.volume = start + diff * p
      if (p < 1) {
        fadeRafRef.current = requestAnimationFrame(tick)
        return
      }
      fadeRafRef.current = null
      if (done) done()
    }

    fadeRafRef.current = requestAnimationFrame(tick)
  }

  const startMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    stopFade()
    audio.volume = 0

    try {
      await audio.play()
      fadeTo(volume)
      setIsPlaying(true)
      autoStartRef.current = false
    } catch {
      setIsPlaying(false)
    }
  }

  const stopMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    fadeTo(0, () => {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    })
  }

  const toggleMusic = async () => {
    if (isPlaying) {
      stopMusic()
      return
    }

    await startMusic()
  }

  const onVolumeChange = (e) => {
    const next = Number(e.target.value)
    setVolume(next)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.volume = volume
    localStorage.setItem(BGM_VOLUME_KEY, String(volume))
  }, [volume, isPlaying])

  useEffect(() => {
    localStorage.setItem(BGM_STATE_KEY, isPlaying ? '1' : '0')
  }, [isPlaying])

  useEffect(() => {
    const shouldAutoStart = localStorage.getItem(BGM_STATE_KEY) === '1'
    if (!shouldAutoStart) return

    autoStartRef.current = true
    const tryAutoplay = async () => {
      if (!autoStartRef.current) return
      await startMusic()
    }

    const unlock = async () => {
      if (!autoStartRef.current) return
      await tryAutoplay()
    }

    window.addEventListener('pointerdown', unlock, { once: true })
    window.addEventListener('keydown', unlock, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
    }
  }, [])

  useEffect(() => () => stopFade(), [])

  return (
    <div className="bgm-panel">
      <audio ref={audioRef} loop preload="none" src="/audio/background.mp3" />
      <button
        className={`bgm-toggle${isPlaying ? ' on' : ''}`}
        type="button"
        onClick={(e) => {
          toggleMusic()
          e.currentTarget.blur()
        }}
        aria-label={isPlaying ? 'Disable background music' : 'Enable background music'}
      >
        {isPlaying ? 'BGM ON' : 'BGM OFF'}
      </button>

      <div className="bgm-slider-wrap" aria-label="Background music volume">
        <span className="bgm-slider-label">VOL</span>
        <input
          className="bgm-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          onKeyDown={(e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
              e.preventDefault()
            }
          }}
        />
        <span className="bgm-slider-value">{Math.round(volume * 100)}</span>
      </div>
    </div>
  )
}

function MenuScreen() {
  const navigate = useNavigate()

  const handleNavigate = (page) => {
    if (page === 'github') {
      window.open('https://github.com/jalonba-x/CV-Persona', '_blank', 'noopener,noreferrer')
      return
    }
    navigate(`/${page}`)
  }

  return (
    <div id="menu-screen">
      <P5Menu onNavigate={handleNavigate} />
    </div>
  )
}

function SiteBackgroundVideo() {
  return (
    <video
      className="site-bg-video"
      src={mainVideo}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route path="/sideproj" element={
          <PageTransition><SideProjectsPage /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

function OrientationOverlay() {
  return (
    <div className="orientation-guard" aria-hidden="true">
      <style>{`
        .orientation-guard {
          display: none;
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: rgba(13, 13, 13, 0.88);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          color: #ffffff;
          pointer-events: all;
        }

        @media (hover: none) and (pointer: coarse) and (orientation: portrait) {
        .orientation-guard {
        display: flex;
        }
      }

        .og-badge {
          font-family: 'Persona5Main', sans-serif;
          background: #d92323;
          color: #ffffff;
          font-size: 24px;
          letter-spacing: 2px;
          padding: 6px 18px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          margin-bottom: 24px;
          box-shadow: 4px 4px 0 #000000;
        }

        .og-title {
          font-family: 'Persona5Main', sans-serif;
          font-size: 42px;
          line-height: 1;
          letter-spacing: 1px;
          margin-bottom: 12px;
          text-shadow: 0 4px 0 rgba(0,0,0,0.5);
        }

        .og-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.8);
          max-width: 320px;
          margin-bottom: 40px;
        }

        .og-phone-icon {
          width: 76px;
          height: 76px;
          stroke: #ffffff;
          stroke-width: 2;
          fill: none;
          animation: og-rotate-animation 2.4s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }

        @keyframes og-rotate-animation {
          0%, 15% { transform: rotate(0deg); }
          50%, 65% { transform: rotate(-90deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      <div className="og-badge">SYSTEM ALERT</div>
      <div className="og-title">ROTATE DEVICE</div>
      <div className="og-subtitle">
        Please turn your phone to a horizontal 16:9 widescreen view to access the interface.
      </div>

      <svg className="og-phone-icon" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    </div>
  );
}

export default function App() {
  useTouchGestures()

  return (
    <div className="stage-container">
      <OrientationOverlay />
      <div className="stage-viewport">
        <SiteBackgroundVideo />
        <BackButton />
        <div className="site-content-layer">
          <AnimatedRoutes />
        </div>
        <BackgroundMusic />
      </div>
    </div>
  )
}
