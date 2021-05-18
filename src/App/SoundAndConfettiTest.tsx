import { useCallback, useEffect, useState } from 'react'
import Sound, { ReactSoundProps } from 'react-sound'
import Confetti, { ConfettiConfig } from 'react-dom-confetti'

import testSound from './game-music.wav'


const confettiConfig: ConfettiConfig = {
  angle: 360,
  spread: 360,
  startVelocity: 40,
  elementCount: 200,
  dragFriction: 0.1,
  duration: 3000,
  stagger: 10,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}


const SoundAndConfettiTest = () => {
  const [volume, setVolume] = useState(100)
  const toggleVolume = useCallback(() => setVolume((state) => {
    state += 33.33
    return state > 100 ? 0 : Math.round(state)
  }), [])


  const [playStatus, setPlayStatus] = useState<ReactSoundProps['playStatus']>('STOPPED')
  const startPlay = useCallback(() => setPlayStatus('PLAYING'), [])
  const pausePlay = useCallback(() => setPlayStatus('PAUSED'), [])
  const stopPlay = useCallback(() => setPlayStatus('STOPPED'), [])


  const [isConfettiActive, setIsConfettiActive] = useState(false)
  const toggleIsConfettiActive = useCallback(() => setIsConfettiActive((state) => !state), [])

  useEffect(() => {
    if (isConfettiActive) {
      const timer = setTimeout(() => setIsConfettiActive(false), confettiConfig.duration)
      return () => clearTimeout(timer)
    }
  }, [isConfettiActive])


  return (
    <div className="my-10">

      {playStatus === 'PLAYING' ? (
        <button onClick={pausePlay}>
          Pause
        </button>
      ) : (
        <button onClick={startPlay}>
          Play
        </button>
      )}
      <br />


      <button onClick={toggleVolume}>
        volume: {volume}%
      </button>
      <br />


      <button
        onClick={toggleIsConfettiActive}
        disabled={isConfettiActive}
      >
        {isConfettiActive ? 'Running' : 'Start Confetti'}
      </button>

      <div className="bg-red-700 w-2 h-2 ml-64">
        <Confetti
          active={isConfettiActive}
          config={confettiConfig}
        />
      </div>


      <Sound
        url={testSound}
        loop
        volume={volume}
        playStatus={playStatus}
        onFinishedPlaying={stopPlay}
      />
    </div>
  )
}


export default SoundAndConfettiTest
