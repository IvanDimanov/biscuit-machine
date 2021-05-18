import PropTypes from 'prop-types'
import Sound from 'react-sound'

import SoundFileUrl from './sounds/stamp.wav'


type StampSoundProps = {
  shouldStamp: boolean
}

const StampSound = ({
  shouldStamp,
}: StampSoundProps) => (
  <Sound
    url={SoundFileUrl}
    playStatus={shouldStamp ? 'PLAYING' : 'STOPPED'}
  />
)


StampSound.propTypes = {
  shouldStamp: PropTypes.bool,
}

StampSound.defaultProps = {
  shouldStamp: false,
}

StampSound.displayName = 'StampSound'


export default StampSound
