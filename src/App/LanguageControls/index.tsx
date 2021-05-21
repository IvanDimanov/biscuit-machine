import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import memoize from 'lodash.memoize'

import ImageFlagBg from './images/flagBg.png'
import ImageFlagEn from './images/flagEn.png'


type LanguageControlsProps = {
  testIdPrefix?: string
  className?: string
}


const LanguageControls = ({
  testIdPrefix,
  className,
}: LanguageControlsProps) => {
  const { i18n } = useTranslation()
  const onChangeLanguage = useMemo(
    () => memoize((language) => () => i18n.changeLanguage(language)),
    [i18n])


  return (
    <div
      data-testid={`${testIdPrefix}.LanguageControls`}
      className={className}
    >

      <div className="flex divide-x-2 divide-gray-600">
        <div
          data-testid={`${testIdPrefix}.LanguageControls.Bulgarian`}
          className={`inline-block cursor-pointer hover:opacity-100 p-2 ${i18n.language === 'bg' ? 'opacity-80' : 'opacity-50'}`}
          onClick={onChangeLanguage('bg')}
        >
          <img
            className="w-10"
            src={ImageFlagBg}
            alt="Български език"
          />
        </div>


        <div
          data-testid={`${testIdPrefix}.LanguageControls.English`}
          className={`inline-block cursor-pointer hover:opacity-100 p-2 ${i18n.language === 'en' ? 'opacity-80' : 'opacity-50'}`}
          onClick={onChangeLanguage('en')}
        >
          <img
            className="w-10"
            src={ImageFlagEn}
            alt="English"
          />
        </div>
      </div>
    </div>
  )
}


LanguageControls.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

LanguageControls.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

LanguageControls.displayName = 'LanguageControls'


export default LanguageControls
