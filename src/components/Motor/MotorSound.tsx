import PropTypes from 'prop-types'
import Sound from 'react-sound'

import SoundFileUrl from './sounds/motor.wav'


type MotorSoundProps = {
  status: 'on' | 'off'
}

const MotorSound = ({
  status,
}: MotorSoundProps) => (
  <Sound
    url={SoundFileUrl}
    loop
    playStatus={status === 'on' ? 'PLAYING' : 'STOPPED'}
  />
)


MotorSound.propTypes = {
  status: PropTypes.oneOf(['on', 'off']),
}

MotorSound.defaultProps = {
  status: 'off',
}

MotorSound.displayName = 'MotorSound'


export default MotorSound
