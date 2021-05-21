import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'

const TextTitle = styled.div`
  text-shadow: #FC0 1px 0 5px;
`

const Title = () => {
  const { t } = useTranslation()

  return (
    <TextTitle
      data-testid="Title"
      className="text-5xl text-yellow-400 text-center font-bold leading-10 pt-20"
    >
      {t('Title.TextTitle')}
    </TextTitle>
  )
}


export default Title
