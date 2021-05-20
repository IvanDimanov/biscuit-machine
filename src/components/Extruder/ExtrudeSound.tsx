import PropTypes from 'prop-types'
import Sound from 'react-sound'

import useSfx, { selectVolume } from '@src/globalState/useSfx'

import SoundFileUrl from './sounds/put.wav'


type ExtrudeSoundProps = {
  shouldExtrude: boolean
}

const ExtrudeSound = ({
  shouldExtrude,
}: ExtrudeSoundProps) => {
  const sfxVolume = useSfx(selectVolume)

  return (
    <Sound
      url={SoundFileUrl}
      volume={sfxVolume}
      playStatus={shouldExtrude ? 'PLAYING' : 'STOPPED'}
    />
  )
}


ExtrudeSound.propTypes = {
  shouldExtrude: PropTypes.bool,
}

ExtrudeSound.defaultProps = {
  shouldExtrude: false,
}

ExtrudeSound.displayName = 'ExtrudeSound'


export default ExtrudeSound
