import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { RefObject } from "./interfaces";

interface VideoProps{
    src: string;
    setVideoRef: Dispatch<SetStateAction<RefObject>>;
}

export default function Video({ src, setVideoRef }: VideoProps){
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        setVideoRef(videoRef)
    }, [])
    
    useEffect(() => {
        if(!videoRef.current) return

        function handleKeyDown(e: KeyboardEvent){
            if(!videoRef.current) return
            switch (e.key) {
                case ' ':
                    videoRef.current.paused ? videoRef.current?.play() : videoRef.current?.pause()
                    break;
                case 'ArrowRight':
                    videoRef.current.currentTime += 10
                    break;
                case 'ArrowLeft':
                    videoRef.current.currentTime -= 10
                    break;
            }

        }

        document.addEventListener("keydown",handleKeyDown)

        return () => document.removeEventListener("keydown",handleKeyDown)

    }, [videoRef.current])

    return(
        <video ref={videoRef} className="w-screen h-screen" src={src} />
    )
}