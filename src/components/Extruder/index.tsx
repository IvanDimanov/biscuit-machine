import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import ExtrudeSound from './ExtrudeSound'
import ImageExtruder from './images/extruder.png'


/* Used as a notification when the extrude is completed */
const ANIMATION_TIME_IN_SECONDS = 2

const ContainerWrap = styled.div`
  border: 3px solid #444;
  border-top: 0px;
  border-radius: 0px 0px 3px 3px;
  background-color: rgb(189, 140, 97);
  
  position: relative;
  width: 50px;
  height: 50px;
  overflow: hidden;

  @keyframes waveAnimation {
    0% {
      transform: translate(-50%, -75%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }

  .liquid {
    position: absolute;
    top: -15px;
    left: 0;
    width: 50px;
    height: 50px;
    background-color: rgb(189, 140, 97);
  }

  .liquid::after,
  .liquid::before {
    content: '';
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -75%);
  }

  .liquid::before {
    border-radius: 45%;
    background: rgba(260, 260, 260, 1);
    animation: waveAnimation 40s linear infinite;
  }

  .liquid::after {
    border-radius: 37%;
    background: rgba(265, 265, 265, 0.5);
    animation: waveAnimation 50s linear infinite;
  }

  .overlay {
    position: absolute;
    top: -100%;
    width: 100%;
    height: 200%;
    box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 0.5);
  }
`

const DropWrap = styled.div`
  display: flex;
  align-items: start;
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 15px 0px 0px 21px;

  @keyframes dropAnimation {
    0% {
      width: 15px;
    }
    90% {
      width: 45px;
    }
    100% {
      transform: translate(0, 140px);
    }
  }

  .drop {
    fill: rgb(189, 140, 97);
  }
  
  .drop.animate {
    animation: dropAnimation cubic-bezier(0.95, 0.05, 0.795, 0.035) ${ANIMATION_TIME_IN_SECONDS}s;
  }
`

export type ExtruderProps = {
  testIdPrefix?: string
  className?: string
  shouldExtrude: boolean
  onExtrudeEnd: () => void
}

const Extruder = ({
  testIdPrefix,
  className,
  shouldExtrude,
  onExtrudeEnd,
}: ExtruderProps) => {
  const timer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (shouldExtrude) {
      timer.current = setTimeout(onExtrudeEnd, ANIMATION_TIME_IN_SECONDS * 1000)
    }
    return () => timer.current && clearTimeout(timer.current)
  }, [shouldExtrude, onExtrudeEnd])


  return (
    <div
      data-testid={`${testIdPrefix}.Extruder`}
      className={className}
    >
      <ContainerWrap>
        <div className="liquid" />
        <div className="overlay" />
      </ContainerWrap>

      <img
        className="absolute z-10"
        src={ImageExtruder}
        alt="Extruder"
      />

      <DropWrap>
        <svg viewBox="0 0 100 100" className={`drop ${shouldExtrude ? 'animate' : ''}`}>
          <path
            // eslint-disable-next-line max-len
            d="M16.515 32.865c-.507 3.12-.507 6.656-.405 10.503.1 3.849.305 8.008-.607 10.4-.912 2.392-2.94 3.017-4.663 2.184-1.724-.832-3.141-3.12-3.951-5.304-.812-2.183-1.014-4.264-.913-6.552.101-2.288.506-4.785 1.318-7.072.81-2.288 2.025-4.368 3.242-6.448 1.216-2.08 2.431-4.16 3.85-5.199 1.42-1.04 3.041-1.04 3.346.311.303 1.352-.71 4.057-1.217 7.177zM22.338 7.03C21.188 4.222 20.595 2.11 20 0c-.595 2.11-1.188 4.222-2.338 7.03-1.15 2.806-2.857 6.31-4.936 10.12-2.08 3.808-4.529 7.922-6.422 11.12-1.893 3.2-3.229 5.487-4.193 7.695-.967 2.208-1.56 4.343-1.856 6.55-.298 2.212-.298 4.495-.185 6.286.11 1.791.333 3.087.741 4.533.408 1.447 1.001 3.045 1.968 4.684.964 1.64 2.3 3.314 3.562 4.533 1.261 1.22 2.45 1.981 3.861 2.704 1.41.723 3.043 1.412 4.565 1.867 1.521.457 2.932.686 3.787.792.851.107 1.15.09 1.446.075.296.015.595.032 1.446-.075a23.659 23.659 0 0 0 3.787-.792c1.522-.455 3.154-1.144 4.565-1.867 1.412-.723 2.6-1.485 3.86-2.704a22.488 22.488 0 0 0 3.563-4.533c.967-1.639 1.56-3.237 1.968-4.684.408-1.446.63-2.742.741-4.533.113-1.79.113-4.074-.185-6.285-.296-2.208-.89-4.343-1.856-6.55-.964-2.209-2.3-4.495-4.193-7.695-1.893-3.199-4.342-7.313-6.422-11.122-2.079-3.809-3.786-7.313-4.936-10.12z"
            fillRule="evenodd"
          />
        </svg>
      </DropWrap>

      <ExtrudeSound shouldExtrude={shouldExtrude} />
    </div>
  )
}


Extruder.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  shouldExtrude: PropTypes.bool,
  onExtrudeEnd: PropTypes.func,
}

Extruder.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  shouldExtrude: false,
  onExtrudeEnd: () => {},
}

Extruder.displayName = 'Extruder'


export default Extruder
