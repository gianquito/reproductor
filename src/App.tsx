import { useState } from 'react'
import './App.css'
import BottomControlsLayout from './BottomControlsLayout'
import { RefObject } from './interfaces'
import SourcePicker from './SourcePicker'
import Video from './Video'

export default function App() {

  const [videoRef, setVideoRef] = useState<RefObject>({ current: null })
  const [videoSource, setVideoSource] = useState('')

  return (
      <div className="bg-black">
        {!videoSource && <SourcePicker setVideoSource={setVideoSource}/> }
        <div className={videoSource ? 'block' : 'hidden'}>
          <BottomControlsLayout videoRef={videoRef} />
          <Video setVideoRef={setVideoRef} src={videoSource}/>
        </div>
      </div>
  )
}
