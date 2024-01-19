import { useEffect, useState } from 'react'
import { ControlProps } from '../interfaces'

export default function Fullscreen({ videoRef }: ControlProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [icon, setIcon] = useState('enterFullscreen.svg')

    useEffect(() => {
        if (!isFullscreen) {
            document.fullscreenElement && document.exitFullscreen()
            setIcon('enterFullscreen.svg')
            return
        }
        document.documentElement.requestFullscreen()
        setIcon('exitFullscreen.svg')
    }, [isFullscreen])

    useEffect(() => {
        if (!videoRef.current) return

        function handleKeyDown(e: KeyboardEvent) {
            if (!videoRef.current) return
            if (e.key === 'f' || e.key === 'F11') {
                e.preventDefault()
                setIsFullscreen((prevIsFullscreen) => !prevIsFullscreen)
            }
        }

        function handleDoubleClick() {
            setIsFullscreen((prevIsFullscreen) => !prevIsFullscreen)
        }

        function handleFullscreenChange() {
            if (document.fullscreenElement) {
                setIsFullscreen((prevIsFullscreen) => (prevIsFullscreen ? prevIsFullscreen : !prevIsFullscreen))
                return
            }
            setIsFullscreen((prevIsFullscreen) => (!prevIsFullscreen ? prevIsFullscreen : !prevIsFullscreen))
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        videoRef.current?.addEventListener('dblclick', handleDoubleClick)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
            videoRef.current?.removeEventListener('dblclick', handleDoubleClick)
        }
    }, [videoRef.current])

    return (
        <div onClick={() => setIsFullscreen((prevIsFullScreen) => !prevIsFullScreen)} className='icon'>
            <img src={icon} draggable='false' alt={`${isFullscreen ? 'Exit' : 'Enter'} fullscreen`} />
        </div>
    )
}
