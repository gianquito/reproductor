import { useEffect, useRef, useState } from 'react'
import DurationBar from './Controls/DurationBar'
import Fullscreen from './Controls/Fullscreen'
import Play from './Controls/Play'
import TimeLeft from './Controls/TimeLeft'
import Volume from './Controls/Volume'
import { ControlProps } from './interfaces'
import { motion } from 'framer-motion'
import { useForceUpdate } from './useForceUpdate'

export default function BottomControlsLayout({ videoRef }: ControlProps) {
    const isVisible = useRef(true)
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        let timeout = 0
        function showControls() {
            if (isVisible.current === false) {
                isVisible.current = true
                forceUpdate()
            }
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                isVisible.current = false
                forceUpdate()
            }, 3000)
        }

        document.addEventListener('mousemove', showControls)
        document.addEventListener('keydown', showControls)

        return () => {
            document.removeEventListener('mousemove', showControls)
            document.removeEventListener('keydown', showControls)
            clearInterval(timeout)
        }
    }, [])

    return (
        <motion.div
            animate={{ opacity: isVisible.current ? 1 : 0 }}
            className={`cursor-none absolute z-20 w-screen bottom-0 flex justify-center ${
                isVisible.current ? 'vis' : 'hid'
            }`}
        >
            <div className='w-[85%] py-6 flex flex-col items-center gap-6'>
                <DurationBar videoRef={videoRef} />
                <div className='flex justify-between w-full'>
                    <div className='flex'>
                        <Play videoRef={videoRef} />
                        <Volume videoRef={videoRef} />
                    </div>
                    <div className='flex gap-4'>
                        <TimeLeft videoRef={videoRef} />
                        <Fullscreen videoRef={videoRef} />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
