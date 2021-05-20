import Sound from 'react-sound'

import useSfx, { selectVolume } from '@src/globalState/useSfx'

import SoundFileUrl from './sounds/score.wav'


const BoxSound = () => {
  const sfxVolume = useSfx(selectVolume)

  return (
    <Sound
      url={SoundFileUrl}
      volume={sfxVolume}
      playStatus="PLAYING"
    />
  )
}


export default BoxSound
