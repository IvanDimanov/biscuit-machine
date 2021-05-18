import styled from '@emotion/styled'

const TextTitle = styled.div`
  text-shadow: #FC0 1px 0 5px;
`

const Title = () => (
  <TextTitle
    data-testid="Title"
    className="text-5xl text-yellow-400 text-center font-bold leading-10 pt-20"
  >
    The Biscuit Machine
  </TextTitle>
)


export default Title
