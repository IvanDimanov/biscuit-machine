import styled from '@emotion/styled'

// import SoundAndConfettiTest from './SoundAndConfettiTest'

import BiscuitMachine from '@src/Machine'

import Title from './Title'
import Footer from './Footer'

import './index.css'


const StyledApp = styled.div`
  background-color: #EFE2B2;
  background-image: linear-gradient(#EFE2B2, #84563C);
`

const Machine = styled(BiscuitMachine)`
  margin-top: 350px;
  margin-left: 150px;
`

const App = () => {
  return (
    <StyledApp className="bg-yellow-200 h-screen">
      <Title />

      <Machine
        testIdPrefix="BiscuitMachine"
      />

      <Footer />
    </StyledApp>
  )
}


export default App
