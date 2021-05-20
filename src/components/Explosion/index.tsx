import { CSSProperties, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import Sound from 'react-sound'
import styled from '@emotion/styled'

import getRandomNumber from '@src/utils/getRandomNumber'

import useSfx, { selectVolume } from '@src/globalState/useSfx'

import SoundFileUrl from './sounds/explosion.wav'


/* Used as a notification when the explosion is completed */
export const EXPLOSION_ANIMATION_TIME_IN_SECONDS = 4

const Wrap = styled.div`
  position: relative;

  @keyframes smokeAnimation { 
    0% {
      opacity: 1;
      filter: blur(5px);
      transform: translateX(0) translateY(0) rotate(0deg) scale(1);
    }

    80% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      filter: blur(30px);
      transform: translateX(100px) translateY(-200px) rotate(360deg) scale(4);
    }
  }

  div {
    position: absolute;
    animation: smokeAnimation ${EXPLOSION_ANIMATION_TIME_IN_SECONDS}s linear forwards;
  }
`

type ExplosionSymbol = {
  key: string
  char: string
  style: CSSProperties
}

type ExplosionProps = {
  testIdPrefix?: string
  className?: string
  shouldExplode: boolean
  color: string
  width: number
  height: number
  density: number
  onExplosionEnd: () => void
}

const Explosion = ({
  testIdPrefix,
  className,
  shouldExplode,
  color,
  width,
  height,
  density,
  onExplosionEnd,
}: ExplosionProps) => {
  const sfxVolume = useSfx(selectVolume)

  const [symbols, setSymbols] = useState<ExplosionSymbol[]>([])

  useEffect(() => setSymbols(() => Array.from({ length: Math.abs(density) })
    .map(() => ({
      key: uuidv4(),
      char: getRandomNumber(0, 35).toString(36).toLocaleLowerCase(),
      style: {
        top: getRandomNumber(0, height),
        left: getRandomNumber(0, width),
        color,
      },
    }))), [density, width, height, color])


  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (shouldExplode) {
      timer.current = setTimeout(onExplosionEnd, EXPLOSION_ANIMATION_TIME_IN_SECONDS * 1000)
    }
    return () => timer.current && clearTimeout(timer.current)
  }, [shouldExplode, onExplosionEnd])


  return (
    <div
      data-testid={`${testIdPrefix}.Explosion`}
      className={className}
    >
      {shouldExplode ? (
        <div>
          <Wrap>
            {symbols.map(({ key, char, style }) => (
              <div key={key} style={style}>
                {char}
              </div>
            ))}
          </Wrap>

          <Sound
            url={SoundFileUrl}
            volume={sfxVolume}
            playStatus="PLAYING"
          />
        </div>
      ) : null}
    </div>
  )
}


Explosion.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  shouldExplode: PropTypes.bool,
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  density: PropTypes.number,
  onExplosionEnd: PropTypes.func,
}

Explosion.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  shouldExplode: false,
  color: '#000',
  width: 100,
  height: 100,
  density: 50,
  onExplosionEnd: () => {},
}

Explosion.displayName = 'Explosion'


export default Explosion
