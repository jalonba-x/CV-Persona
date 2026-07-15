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
    zIndex: -1,            // MUST BE NEGATIVE ONE to push it behind text/buttons!
    pointerEvents: "none", // ALLOWS clicks to pass right through the video to the buttons
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    // Apply the styles directly to the outer wrapper so it becomes a ghost element
    <div id="video-screen" style={videoContainerStyle}>
      {src && (
        <video 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={src} 
          autoPlay 
          loop 
          muted 
          playsInline 
        />
      )}
    </div>
  )
}
