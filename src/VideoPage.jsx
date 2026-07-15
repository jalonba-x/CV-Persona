import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VideoPage({ src }) {
  const navigate = useNavigate()

  const videoContainerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  objectFit: "cover",
  zIndex: -1,              // MUST BE NEGATIVE ONE to push it behind text/buttons!
  pointerEvents: "none",   // ALLOWS clicks to pass right through the video to the buttons
};

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <div id="menu-screen">
      {/* <video src={src} autoPlay loop muted playsInline /> */}
    </div>
  )
}
