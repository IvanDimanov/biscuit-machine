import PropTypes from 'prop-types'
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
}: OvenProps) => (
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
            transition-opacity duration-1000 ease-in-out
            ${status === 'on' ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>


      <div className="relative z-20">
        <img
          data-testid={`${testIdPrefix}.Oven.HeatingElement`}
          className="absolute w-52 mt-24 mx-8"
          src={status === 'on' ? ImageHeatingElementOn : ImageHeatingElementOff}
          alt={status === 'on' ? 'Heating is On' : 'Heating is Off'}
        />

        <img
          className="absolute"
          src={ImageOven}
          alt="Oven"
        />
      </div>
    </Wrap>
  </div>
)


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
