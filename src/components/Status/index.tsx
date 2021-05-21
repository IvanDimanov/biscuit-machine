import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import ImageStatusOn from './images/StatusOn.png'
import ImageStatusOff from './images/StatusOff.png'
import ImageStatusPause from './images/StatusPause.png'
import ImageStatusBlank from './images/StatusBlank.png'


const getClassName = (isVisible: boolean) => `absolute transition-opacity duration-500 ease-in-out opacity-${isVisible ? 100 : 0}`

export type StatusProps = {
  testIdPrefix?: string
  className?: string
  value: 'on' | 'off' | 'pause'
  bar?: 'bottomLeft' | 'bottomRight'
}

const Status = ({
  testIdPrefix,
  className,
  value,
  bar,
}: StatusProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={className}
      data-testid={`${testIdPrefix}.Status`}
    >
      <div className="relative w-10 h-24">
        {bar === 'bottomLeft' ? (
          <div className={`
            absolute
            border-r-8 border-b-8 border-gray-900 rounded-br-2xl
            w-10 h-10
            mt-20
            -ml-4
          `} />
        ) : null}

        {bar === 'bottomRight' ? (
          <div className={`
            absolute
            border-l-8 border-b-8 border-gray-900 rounded-bl-2xl
            w-10 h-10
            mt-20
            ml-4
          `} />
        ) : null}

        <img
          className="absolute"
          src={ImageStatusBlank}
          alt={t('Status.Blank')}
        />

        <img
          data-testid={`${testIdPrefix}.Status.On`}
          className={getClassName(value === 'on')}
          src={ImageStatusOn}
          alt={t('Status.On')}
        />

        <img
          data-testid={`${testIdPrefix}.Status.Off`}
          className={getClassName(value === 'off')}
          src={ImageStatusOff}
          alt={t('Status.Off')}
        />

        <img
          data-testid={`${testIdPrefix}.Status.Pause`}
          className={getClassName(value === 'pause')}
          src={ImageStatusPause}
          alt={t('Status.Pause')}
        />
      </div>
    </div>
  )
}


Status.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOf(['on', 'off', 'pause']),
  bar: PropTypes.oneOf(['bottomLeft', 'bottomRight']),
}

Status.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  value: 'off',
  bar: undefined,
}

Status.displayName = 'Status'


export default Status
