import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'

import ImageOven from './images/oven.png'
import ImageHeatingElementOn from './images/heatingElementOn.png'
import ImageHeatingElementOff from './images/heatingElementOff.png'


const Wrap = styled.div`
  width: 242px;
  height: 256px;
`

const HeatBackGround = styled.div`
  background-color: #a40606;
  background-image: linear-gradient(#a40606 0%, #d98324 74%);
  transition-duration: 4s;
`


export type OvenProps = {
  testIdPrefix?: string
  className?: string
  status: 'on' | 'off'
}

const Oven = ({
  testIdPrefix,
  className,
  status,
}: OvenProps) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid={`${testIdPrefix}.Oven`}
      className={className}
    >
      <Wrap className="relative">
        <div className="relative z-1">
          {/* Gray background used when the Oven is Off */}
          <div
            className={`
              absolute
              bg-gray-400
              w-64 h-64
              mt-3 mx-2
            `}
          />

          <HeatBackGround
            className={`
              absolute
              w-64 h-64
              mt-3 mx-2
              transition-opacity ease-in-out
              ${status === 'on' ? 'opacity-100' : 'opacity-0'}
            `}
          />
        </div>


        <div className="relative z-20">
          <img
            data-testid={`${testIdPrefix}.Oven.HeatingElement`}
            className="absolute w-52 mt-24 mx-8"
            src={status === 'on' ? ImageHeatingElementOn : ImageHeatingElementOff}
            alt={status === 'on' ? t('Oven.HeatingElementOn') : t('Oven.HeatingElementOff')}
          />

          <img
            className="absolute"
            src={ImageOven}
            alt={t('Oven.Image')}
          />
        </div>
      </Wrap>
    </div>
  )
}


Oven.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  status: PropTypes.oneOf(['on', 'off']),
}

Oven.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  status: 'off',
}

Oven.displayName = 'Oven'


export default Oven
