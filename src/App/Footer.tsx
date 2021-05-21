import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <div
      data-testid="Footer"
      className="static"
    >
      <div className="absolute leading-10 text-center text-yellow-300 bottom-0 w-full">
        {t('Footer.madeWith')}
        {' '}
        &#129505;
        {' '}
        {t('Footer.by')}
        {' '}
        <a
          href="https://github.com/ivanDimanov"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Footer.author')}
        </a>
      </div>
    </div>
  )
}


export default Footer
