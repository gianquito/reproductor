import { useEffect, useRef, useState } from 'react'
import { ControlProps } from '../interfaces'
import { secondsToHms } from '../utils'

export default function DurationBar({ videoRef }: ControlProps) {
    const [progress, setProgress] = useState(0)
    const totalBar = useRef<HTMLDivElement>(null)
    const partialBar = useRef<HTMLDivElement>(null)
    const currentTimeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!videoRef.current) {
            return
        }
        let changingDuration = false

        function updateVideoBar() {
            setProgress((videoRef.current?.currentTime as number) / (videoRef.current?.duration as number))
        }

        function setDurationBarPostion(e: MouseEvent) {
            if (!changingDuration) {
                return
            }
            if (!partialBar.current) {
                return
            }
            if (!videoRef.current) {
                return
            }
            if (!currentTimeRef.current) {
                return
            }

            e.preventDefault()

            const { left: barLeft, right: barRight } = totalBar.current?.getBoundingClientRect() as DOMRect

            let porc = (e.clientX - barLeft) / (barRight - barLeft)

            if (porc < 0) {
                porc = 0
            } else if (porc > 1) {
                porc = 1
            }

            partialBar.current.style.width = porc * 100 + '%'

            const { left, right } = partialBar.current.getBoundingClientRect()
            currentTimeRef.current.style.left = right - left - 15 + 'px'

            const videoDuration = videoRef.current.duration
            videoRef.current.currentTime = porc * videoDuration

            setProgress(videoRef.current.currentTime / videoDuration)
        }

        function handleMouseMove(e: MouseEvent) {
            setDurationBarPostion(e)
        }

        function handleMouseDown(e: MouseEvent) {
            changingDuration = true
            if (!currentTimeRef.current) return
            currentTimeRef.current.style.display = 'block'
            setDurationBarPostion(e)
        }

        function handleMouseUp() {
            changingDuration = false
            if (!currentTimeRef.current) return
            currentTimeRef.current.style.display = 'none'
        }

        totalBar.current?.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        videoRef.current.addEventListener('timeupdate', updateVideoBar)

        return () => {
            totalBar.current?.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
            videoRef.current?.removeEventListener('timeupdate', updateVideoBar)
        }
    }, [videoRef.current])

    return (
        <>
            <div ref={currentTimeRef} className='hidden w-max rounded' style={{ background: 'rgba(38,38,38,0.5)' }}>
                <p className='text-white px-2 py-1 font-roboto text-sm font-medium'>
                    {secondsToHms(progress * videoRef.current?.duration!)}
                </p>
            </div>
            <div ref={totalBar} className='w-full h-[10px] rounded-lg flex' style={{ background: 'rgba(38,38,38,0.5' }}>
                <div
                    ref={partialBar}
                    className='h-[10px] bg-white rounded-l-lg'
                    style={{ width: progress * 100 + '%' }}
                ></div>
                <div className='z-20 w-5 h-5 bg-white rounded-full right-0.5 bottom-1 relative'></div>
            </div>
        </>
    )
}
