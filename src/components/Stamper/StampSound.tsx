import PropTypes from 'prop-types'
import Sound from 'react-sound'

import useSfx, { selectVolume } from '@src/globalState/useSfx'

import SoundFileUrl from './sounds/stamp.wav'


type StampSoundProps = {
  shouldStamp: boolean
}

const StampSound = ({
  shouldStamp,
}: StampSoundProps) => {
  const sfxVolume = useSfx(selectVolume)

  return (
    <Sound
      url={SoundFileUrl}
      volume={sfxVolume}
      playStatus={shouldStamp ? 'PLAYING' : 'STOPPED'}
    />
  )
}


StampSound.propTypes = {
  shouldStamp: PropTypes.bool,
}

StampSound.defaultProps = {
  shouldStamp: false,
}

StampSound.displayName = 'StampSound'


export default StampSound
