import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import StampSound from './StampSound'

/* Used as a notification when the stamp is it it`s lowest point */
const STAMP_DOWN_ANIMATION_TIME_IN_SECONDS = 0.5

/* How much time the stamper stays fully extended before it contracts */
const ANIMATION_PAUSE_IN_SECONDS = 1

/* Used as a notification when the stamp is completed */
const ANIMATION_TIME_IN_SECONDS = 2

/* Used as a notification when the stamp is it it`s lowest point */
const STAMP_UP_ANIMATION_TIME_IN_SECONDS = ANIMATION_TIME_IN_SECONDS -
  STAMP_DOWN_ANIMATION_TIME_IN_SECONDS -
  ANIMATION_PAUSE_IN_SECONDS


const Top = styled.div`
  position: absolute;
  top: 0;
  border: 3px solid #444;
  border-radius: 3px;
  background-color: #979797;
  overflow: hidden;
  z-index: 10;

  width: 80px;
  height: 30px;

  div {
    position: absolute;
    top: -50%;
    width: 100%;
    height: 200%;
    box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 0.5);
  }
`

const SegmentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform-origin:top;
  z-index: 1;
  transform: scaleY(0);

  @keyframes StampDownAnimation {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }

  @keyframes StampUpAnimation {
    from {
      transform: scaleY(1);
    }
    to {
      transform: scaleY(0);
    }
  }

  &.animate {
    animation-name: StampDownAnimation, StampUpAnimation;
    animation-duration: ${STAMP_DOWN_ANIMATION_TIME_IN_SECONDS}s, ${STAMP_UP_ANIMATION_TIME_IN_SECONDS}s;
    animation-delay: 0s, ${ANIMATION_PAUSE_IN_SECONDS}s;
    animation-timing-function: cubic-bezier(0.5, 0, 0.75, 0), linear;
    animation-fill-mode: forwards, forwards;
  }

  > div {
    position: relative;
    border: 3px solid #444;
    border-radius: 0px 0px 3px 3px;
    background-color: #979797;
    height: 30px;
    overflow: hidden;

    > div {
      position: absolute;
      top: -50%;
      width: 100%;
      height: 200%;
      box-shadow: inset 0px 0px 15px 5px rgba(0, 0, 0, 0.5);
    }
  }
`
const Segment1 = styled.div`
  width: 40px;
`
const Segment2 = styled.div`
  width: 34px;
`
const Segment3 = styled.div`
  width: 28px;
`
const Segment4 = styled.div`
  width: 22px;
`
const Stamp = styled.div`
  border-radius: 3px 3px 0px 0px !important;
  width: 47px;
  height: 15px !important;
  margin-top: -10px;
`

export type StamperProps = {
  testIdPrefix?: string
  className?: string
  shouldStamp: boolean
  onStamp: () => void
  onStampEnd: () => void
}

const Stamper = ({
  testIdPrefix,
  className,
  shouldStamp,
  onStamp,
  onStampEnd,
}: StamperProps) => {
  const timerOnStamp = useRef<NodeJS.Timeout>()
  const timerOnStampEnd = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (shouldStamp) {
      timerOnStamp.current = setTimeout(onStamp, STAMP_DOWN_ANIMATION_TIME_IN_SECONDS * 1000)
      timerOnStampEnd.current = setTimeout(onStampEnd, ANIMATION_TIME_IN_SECONDS * 1000)
    }
    return () => {
      timerOnStamp.current && clearTimeout(timerOnStamp.current)
      timerOnStampEnd.current && clearTimeout(timerOnStampEnd.current)
    }
  }, [shouldStamp, onStamp, onStampEnd])


  return (
    <div
      data-testid={`${testIdPrefix}.Stamper`}
      className={className}
    >
      <div className="relative flex flex-col items-center justify-center">
        <Top>
          <div />
        </Top>

        <SegmentWrap className={shouldStamp ? 'animate' : ''}>
          <Segment1><div /></Segment1>
          <Segment1><div /></Segment1>
          <Segment2><div /></Segment2>
          <Segment3><div /></Segment3>
          <Segment4><div /></Segment4>
          <Stamp><div /></Stamp>
        </SegmentWrap>
      </div>

      <StampSound shouldStamp={shouldStamp} />
    </div>
  )
}


Stamper.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  shouldStamp: PropTypes.bool,
  onStamp: PropTypes.func,
  onStampEnd: PropTypes.func,
}

Stamper.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  shouldStamp: false,
  onStamp: () => {},
  onStampEnd: () => {},
}

Stamper.displayName = 'Stamper'


export default Stamper
