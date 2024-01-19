import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useForceUpdate } from '../useForceUpdate'

interface VolumeBarProps {
    volume: number
    setVolume: Dispatch<SetStateAction<number>>
}

export default function VolumeBar({ volume, setVolume }: VolumeBarProps) {
    const totalBar = useRef<HTMLDivElement>(null)
    const partialBar = useRef<HTMLDivElement>(null)
    const barContainer = useRef<HTMLDivElement>(null)
    const isVisible = useRef(false)
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        if (!partialBar.current) return
        partialBar.current.style.width = volume * 100 - 5 + '%'
    }, [volume])

    useEffect(() => {
        let timeout = 0
        let changingVolume = false

        function setVolumebarPosition(e: MouseEvent) {
            if (!changingVolume) {
                return
            }
            if (!partialBar.current) {
                return
            }
            e.preventDefault()
            const barLeft = totalBar.current?.getBoundingClientRect().left as number
            let porc = (e.clientX - barLeft) / 100

            if (porc < 0) {
                porc = 0
            } else if (porc > 1) {
                porc = 1
            }

            setVolume(porc)
        }

        function handleMouseMove(e: MouseEvent) {
            setVolumebarPosition(e)
        }

        function handleMouseDown(e: MouseEvent) {
            changingVolume = true
            setVolumebarPosition(e)
        }

        function handleMouseUp() {
            changingVolume = false
        }

        function showVolumeBar() {
            if (isVisible.current === false) {
                isVisible.current = true
                forceUpdate()
            }
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                isVisible.current = false
                forceUpdate()
            }, 1800)
        }

        function handleScroll(e: WheelEvent) {
            if (e.deltaY === -100) {
                setVolume((prevVolume) => (prevVolume <= 0.9 ? (prevVolume += 0.1) : 1))
            } else if (e.deltaY === 100) {
                setVolume((prevVolume) => (prevVolume >= 0.1 ? (prevVolume -= 0.1) : 0))
            }
        }

        totalBar.current?.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mousemove', handleMouseMove)
        barContainer.current?.addEventListener('mousemove', showVolumeBar)
        document.addEventListener('mouseup', handleMouseUp)
        barContainer.current?.addEventListener('wheel', handleScroll)

        return () => {
            totalBar.current?.removeEventListener('mousedown', handleMouseDown)
            document.removeEventListener('mousemove', handleMouseMove)
            barContainer.current?.removeEventListener('mousemove', showVolumeBar)
            document.removeEventListener('mouseup', handleMouseUp)
            barContainer.current?.removeEventListener('wheel', handleScroll)
        }
    }, [])

    return (
        <motion.div
            animate={{ opacity: isVisible.current ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            ref={barContainer}
            className='h-[30px] w-[100px] ml-2 flex items-center'
        >
            <div ref={totalBar} className='h-2 w-full rounded-lg flex' style={{ background: 'rgba(38,38,38,0.5' }}>
                <div ref={partialBar} className='w-full h-2 bg-white rounded-l-lg'></div>
                <div className='z-20 w-5 h-5 bg-white rounded-full bottom-[0.40rem] right-0.5 relative'></div>
            </div>
        </motion.div>
    )
}
