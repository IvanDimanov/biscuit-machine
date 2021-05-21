import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'

import ImageBlob from './images/blob.png'
import ImageUnbacked from './images/unbacked.png'
import ImageBacked from './images/backed.png'
import ImageOverBacked from './images/overBacked.png'


const Vapor = styled.div`
  opacity: 0;
  top: 0;
  left: 0;

  @keyframes fadeAnimation {
    50% {
      opacity: 1;
    }
  }

  @keyframes upAnimation {
    100% {
      top: -40px;
    }
  }

  animation: fadeAnimation 3s cubic-bezier(0.65, 0, 0.35, 1) infinite,
             upAnimation 3s cubic-bezier(0.65, 0, 0.35, 1) infinite;
`

export type BiscuitProps = {
  testIdPrefix?: string
  className?: string
  form: 'blob' | 'unbacked' | 'backed' | 'overBacked'
  isBacking: boolean
}

const Biscuit = ({
  testIdPrefix,
  className,
  form,
  isBacking,
}: BiscuitProps) => {
  const { t } = useTranslation()

  return (
    <div
      data-testid={`${testIdPrefix}.Biscuit`}
      className={className}
    >
      {isBacking ? (
        <div
          data-testid={`${testIdPrefix}.Biscuit.Vapor`}
          className="flex relative text-xs text-yellow-300"
        >
          <Vapor className="absolute transform rotate-90 mt-1">
            &#x301C;
          </Vapor>

          <Vapor className="absolute transform rotate-90 mx-2">
            &#x301C;
          </Vapor>

          <Vapor className="absolute transform rotate-90 mt-2 mx-4">
            &#x301C;
          </Vapor>
        </div>
      ) : null}

      <div className="relative w-8 h-4 mt-1">
        <img
          data-testid={`${testIdPrefix}.Biscuit.Blob`}
          className={`
            absolute
            transition-opacity
            ${form === 'blob' ? 'opacity-100' : 'opacity-0'}
          `}
          src={ImageBlob}
          alt={t('Biscuit.Blob')}
        />

        <img
          data-testid={`${testIdPrefix}.Biscuit.Unbacked`}
          className={`
            absolute
            transition-opacity
            ${form === 'unbacked' ? 'opacity-100' : 'opacity-0'}
          `}
          src={ImageUnbacked}
          alt={t('Biscuit.Unbacked')}
        />

        <img
          data-testid={`${testIdPrefix}.Biscuit.Backed`}
          className={`
            absolute
            transition-opacity
            ${form === 'backed' ? 'opacity-100' : 'opacity-0'}
          `}
          src={ImageBacked}
          alt={t('Biscuit.Backed')}
        />

        <img
          data-testid={`${testIdPrefix}.Biscuit.OverBacked`}
          className={`
            absolute
            transition-opacity
            ${form === 'overBacked' ? 'opacity-100' : 'opacity-0'}
          `}
          src={ImageOverBacked}
          alt={t('Biscuit.OverBacked')}
        />
      </div>
    </div>
  )
}


Biscuit.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  form: PropTypes.oneOf(['blob', 'unbacked', 'backed', 'overBacked']),
  isBacking: PropTypes.bool,
}

Biscuit.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  form: 'blob',
  isBacking: false,
}

Biscuit.displayName = 'Biscuit'


export default Biscuit
