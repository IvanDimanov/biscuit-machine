import styled from '@emotion/styled'

// import SoundAndConfettiTest from './SoundAndConfettiTest'

import Machine from '@src/Machine'

import Title from './Title'
import Footer from './Footer'

import './index.css'


const StyledApp = styled.div`
  background-color: #EFE2B2;
  background-image: linear-gradient(#EFE2B2, #84563C);
`

const App = () => {
  return (
    <StyledApp className="bg-yellow-200 h-screen">
      <Title />

      <Machine testIdPrefix="BiscuitMachine" />

      <Footer />
    </StyledApp>
  )
}


export default App
