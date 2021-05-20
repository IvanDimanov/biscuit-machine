import PropTypes from 'prop-types'
import Sound from 'react-sound'

import useSfx, { selectVolume } from '@src/globalState/useSfx'

import SoundFileUrl from './sounds/motor.wav'


type MotorSoundProps = {
  status: 'on' | 'off'
}

const MotorSound = ({
  status,
}: MotorSoundProps) => {
  const sfxVolume = useSfx(selectVolume)

  return (
    <Sound
      url={SoundFileUrl}
      volume={sfxVolume}
      loop
      playStatus={status === 'on' ? 'PLAYING' : 'STOPPED'}
    />
  )
}


MotorSound.propTypes = {
  status: PropTypes.oneOf(['on', 'off']),
}

MotorSound.defaultProps = {
  status: 'off',
}

MotorSound.displayName = 'MotorSound'


export default MotorSound
