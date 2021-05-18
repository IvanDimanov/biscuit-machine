import PropTypes from 'prop-types'
import Sound from 'react-sound'

import SoundFileUrl from './sounds/put.wav'


type ExtrudeSoundProps = {
  shouldExtrude: boolean
}

const ExtrudeSound = ({
  shouldExtrude,
}: ExtrudeSoundProps) => (
  <Sound
    url={SoundFileUrl}
    playStatus={shouldExtrude ? 'PLAYING' : 'STOPPED'}
  />
)


ExtrudeSound.propTypes = {
  shouldExtrude: PropTypes.bool,
}

ExtrudeSound.defaultProps = {
  shouldExtrude: false,
}

ExtrudeSound.displayName = 'ExtrudeSound'


export default ExtrudeSound
