import Sound from 'react-sound'
import SoundFileUrl from './sounds/score.wav'


const BoxSound = () => (
  <Sound
    url={SoundFileUrl}
    playStatus="PLAYING"
  />
)


export default BoxSound
