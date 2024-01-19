import { useEffect, useState } from 'react'
import { ControlProps } from '../interfaces'
import { secondsToHms } from '../utils'

export default function TimeLeft({ videoRef }: ControlProps) {
    const [timeLeft, setTimeLeft] = useState('00:00')

    useEffect(() => {
        if (!videoRef.current) {
            return
        }
        function setDuration() {
            setTimeLeft(secondsToHms(videoRef.current?.duration as number))
        }

        function updateTime() {
            setTimeLeft(
                secondsToHms((videoRef.current?.duration as number) - (videoRef.current?.currentTime as number))
            )
        }

        videoRef.current.addEventListener('timeupdate', updateTime)
        videoRef.current.addEventListener('durationchange', setDuration)

        return () => {
            videoRef.current?.removeEventListener('timeupdate', updateTime)
            videoRef.current?.removeEventListener('durationchange', setDuration)
        }
    }, [videoRef.current])

    return (
        <div>
            <span className='text-white font-bold font-roboto select-none'>{timeLeft}</span>
        </div>
    )
}
