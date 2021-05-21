import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'

import MotorSound from './MotorSound'
import ImageMotor from './images/motor.png'


const MotorWrap = styled.div`
  display: inline-block;

  @keyframes wobble {
    0%, 100% {
      transform: none
    }
    15%, 45%, 75% {
      transform: translate3d(-0.6px, 0, 0) rotate3d(0, 0, 1, -0.2deg)
    }
    30%, 60% {
      transform: translate3d(0.6px, 0, 0) rotate3d(0, 0, 1, 0.2deg)
    }
  }

  &.animate {
    animation: wobble 0.7s ease-in-out infinite alternate;
  }
`

export type MotorProps = {
  testIdPrefix?: string
  className?: string
  status: 'on' | 'off'
}

const Motor = ({
  testIdPrefix,
  className,
  status,
}: MotorProps) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid={`${testIdPrefix}.Motor`}
      className={className}
    >
      <MotorWrap className={status === 'on' ? 'animate' : ''}>
        <img
          data-testid={`${testIdPrefix}.Motor.Image`}
          className="w-40"
          src={ImageMotor}
          alt={t('Motor.Image')}
        />
      </MotorWrap>

      <MotorSound status={status} />
    </div>
  )
}


Motor.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  status: PropTypes.oneOf(['on', 'off']),
}

Motor.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  status: 'off',
}

Motor.displayName = 'Motor'


export default Motor
