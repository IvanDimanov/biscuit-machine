import PropTypes from 'prop-types'
import Sound, { ReactSoundProps } from 'react-sound'

import useSfx, { selectVolume } from '@src/globalState/useSfx'

import SoundFileUrl from './sounds/onChange.wav'


type SwitchSoundProps = {
  playStatus: ReactSoundProps['playStatus']
  onFinishedPlaying: ReactSoundProps['onFinishedPlaying']
}

const SwitchSound = ({
  playStatus,
  onFinishedPlaying,
}: SwitchSoundProps) => {
  const sfxVolume = useSfx(selectVolume)

  return (
    <Sound
      url={SoundFileUrl}
      volume={sfxVolume}
      playStatus={playStatus}
      onFinishedPlaying={onFinishedPlaying}
    />
  )
}


SwitchSound.propTypes = {
  playStatus: PropTypes.string,
  onFinishedPlaying: PropTypes.func,
}

SwitchSound.defaultProps = {
  playStatus: 'STOPPED',
  onFinishedPlaying: () => {},
}

SwitchSound.displayName = 'SwitchSound'


export default SwitchSound
