import PropTypes from 'prop-types'
import Sound from 'react-sound'

import useSfx, { selectVolume } from '@src/globalState/useSfx'

import SoundFileUrl from './sounds/warning.wav'


type WarningSignProps = {
  testIdPrefix?: string
  className?: string
}

const WarningSign = ({
  testIdPrefix,
  className,
}: WarningSignProps) => {
  const sfxVolume = useSfx(selectVolume)

  return (
    <div
      data-testid={`${testIdPrefix}.WarningSign`}
      className={className}
    >
      <div className={`
        text-xl text-red-800
        border-2 border-red-800 rounded-full
        flex justify-center items-center
        w-10 h-10
        animate-pulse
      `}>
        <div className="-mt-1">
          &#x26A0;
        </div>
      </div>

      <Sound
        url={SoundFileUrl}
        volume={sfxVolume}
        loop
        playStatus="PLAYING"
      />
    </div>
  )
}


WarningSign.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

WarningSign.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

WarningSign.displayName = 'WarningSign'


export default WarningSign
