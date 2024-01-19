import { useEffect, useState } from "react"
import { ControlProps } from "../interfaces"
import VolumeBar from "./VolumeBar"


export default function Volume({ videoRef }: ControlProps){
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [icon, setIcon] = useState('speaker.svg')

    useEffect(() => {
        if(!videoRef.current) return;

        videoRef.current.volume = volume

    }, [volume])

    useEffect(() => {
        if(!videoRef.current) return;
        
        videoRef.current.muted = isMuted

        if(isMuted){
            setIcon('muted.svg')
            return
        }
        setIcon('speaker.svg')

    }, [isMuted])


    useEffect(() => {
        if(!videoRef.current) return
        function handleKeyDown(e: KeyboardEvent){
            if(!videoRef.current) return
            switch (e.key) {
                case 'ArrowUp':
                    setVolume(prevVolume => prevVolume <= 0.95 ? prevVolume += 0.05 : 1)
                    break;
                case 'ArrowDown':
                    setVolume(prevVolume => prevVolume >= 0.05 ? prevVolume -= 0.05 : 0)
                    break;
                case 'm':
                    setIsMuted(prevIsMuted => !prevIsMuted)
                    break;
            }
        }
        
        document.addEventListener('keydown',handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [videoRef.current])

    return(
        <div className="ml-4 flex">
            <div className="icon">
                <img onClick={() => setIsMuted(prevIsMuted => !prevIsMuted)} src={icon} alt={isMuted ? 'Unmute' : 'Mute'}/>
            </div>
            <VolumeBar volume={volume} setVolume={setVolume}/>
        </div>
    )
}