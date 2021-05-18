import { useState, useEffect, useMemo } from 'react'
import Sound, { ReactSoundProps } from 'react-sound'

import rescaleInput from '@src/utils/rescaleInput'

import { CENTER_UNITS_PER_SECOND_MIN, CENTER_UNITS_PER_SECOND_MAX } from './index'
import SoundFileUrl from './sounds/belt.wav'

const PLAYBACK_RATE_MIN = 2
const PLAYBACK_RATE_MAX = 4

type BeltSoundProps = {
  centerUnitsPerSecond: number
}

const BeltSound = ({
  centerUnitsPerSecond,
}: BeltSoundProps) => {
  const [playStatus, setPlayStatus] = useState<ReactSoundProps['playStatus']>('STOPPED')
  useEffect(() => {
    if (Math.max(0, centerUnitsPerSecond)) {
      setPlayStatus('PLAYING')
    } else {
      setPlayStatus('STOPPED')
    }
  }, [centerUnitsPerSecond])


  const playbackRate: number = useMemo(() => rescaleInput(
    centerUnitsPerSecond,
    [CENTER_UNITS_PER_SECOND_MIN, CENTER_UNITS_PER_SECOND_MAX],
    [PLAYBACK_RATE_MIN, PLAYBACK_RATE_MAX],
  ), [centerUnitsPerSecond])


  return (
    <Sound
      url={SoundFileUrl}
      loop
      playStatus={playStatus}
      playbackRate={playbackRate}
    />
  )
}


BeltSound.propTypes = {
  centerUnitsPerSecond: ({ centerUnitsPerSecond }, _, componentName) => {
    if (Number.isNaN( Number(centerUnitsPerSecond) )) {
      return new TypeError(
        `Invalid prop \`centerUnitsPerSecond\` of type \`${typeof centerUnitsPerSecond}\` ` +
        `supplied to \`${componentName}\`, expected \`number\``)
    }

    if (centerUnitsPerSecond < CENTER_UNITS_PER_SECOND_MIN || centerUnitsPerSecond > CENTER_UNITS_PER_SECOND_MAX) {
      return new RangeError(
        `Invalid prop \`centerUnitsPerSecond\` of value \`${centerUnitsPerSecond}\` ` +
        `supplied to \`${componentName}\`, value to be between [${CENTER_UNITS_PER_SECOND_MIN}, ${CENTER_UNITS_PER_SECOND_MAX}]`)
    }
  },
}

BeltSound.defaultProps = {
  centerUnitsPerSecond: 0,
}

BeltSound.displayName = 'BeltSound'


export default BeltSound
