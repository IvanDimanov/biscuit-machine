import { useCallback } from 'react'
import styled from '@emotion/styled'

// import SoundAndConfettiTest from './SoundAndConfettiTest'

import Machine, { MachineProps } from '@src/Machine'

import Title from './Title'
import Footer from './Footer'

import './index.css'


const StyledApp = styled.div`
  background-color: #EFE2B2;
  background-image: linear-gradient(#EFE2B2, #84563C);
`

const App = () => {
  const onGameOver = useCallback<MachineProps['onGameOver']>((totalScore, totalCollectedBiscuits, isOvenALive) => {
    console.log('totalScore =', totalScore)
    console.log('totalCollectedBiscuits =', totalCollectedBiscuits)
    console.log('isOvenALive =', isOvenALive)
  }, [])


  return (
    <StyledApp className="bg-yellow-200 h-screen">
      <Title />

      <Machine
        testIdPrefix="BiscuitMachine"
        onGameOver={onGameOver}
      />

      <Footer />
    </StyledApp>
  )
}


export default App
