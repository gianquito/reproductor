import { useEffect, useState } from "react"
import { ControlProps } from "../interfaces";

export default function Play({ videoRef }: ControlProps){
    const [isPlaying, setIsPlaying] = useState(false)
    const [icon, setIcon] = useState('play.svg')

    useEffect(() => {
        if(!videoRef.current) return

        function handlePlay(){
            setIsPlaying(true)
        }

        function handlePause(){
            setIsPlaying(false)
        }

        videoRef.current.addEventListener("play", handlePlay)
        videoRef.current.addEventListener("pause", handlePause)

        return () => {
            videoRef.current?.removeEventListener("play", handlePlay)
            videoRef.current?.removeEventListener("pause", handlePause)
        }

    },[videoRef.current])


    useEffect(() => {
        if(!isPlaying){
            videoRef.current?.pause()
            setIcon('play.svg')
            return
        }
        videoRef.current?.play()
        setIcon('pause.svg')
    },[isPlaying])

    return (
        <div className="icon" onClick={() => setIsPlaying(prevIsPlaying => !prevIsPlaying)}>
            <img src={icon} alt={isPlaying ? 'Pause' : 'Play'}/>
        </div>
    )
}