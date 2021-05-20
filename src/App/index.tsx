import { useCallback, useState } from 'react'
import styled from '@emotion/styled'

// import SoundAndConfettiTest from './SoundAndConfettiTest'

import Machine, { MachineProps } from '@src/Machine'

import useMachine, { selectResetState as selectResetMachineState } from '@src/globalState/useMachine'
import useSwitchPart, { selectResetState as selectResetSwitchState } from '@src/globalState/useSwitchPart'
import useMotorPart, { selectResetState as selectResetMotorState } from '@src/globalState/useMotorPart'
import useConveyorBeltPart, { selectResetState as selectResetBeltState } from '@src/globalState/useConveyorBeltPart'
import useExtruderPart, { selectResetState as selectResetExtruderState } from '@src/globalState/useExtruderPart'
import useStamperPart, { selectResetState as selectResetStamperState } from '@src/globalState/useStamperPart'
import useOvenPart, { selectResetState as selectResetOvenState } from '@src/globalState/useOvenPart'
import useCollectionBoxPart, { selectResetState as selectResetBoxState } from '@src/globalState/useCollectionBoxPart'

import Title from './Title'
import Footer from './Footer'
import SoundControls from './SoundControls'
import ModalWon from './modals/ModalWon'
import ModalLost from './modals/ModalLost'

import './index.css'


const StyledApp = styled.div`
  background-color: #EFE2B2;
  background-image: linear-gradient(#EFE2B2, #84563C);
`

const App = () => {
  const resetMachineState = useMachine(selectResetMachineState)
  const resetSwitchState = useSwitchPart(selectResetSwitchState)
  const resetMotorState = useMotorPart(selectResetMotorState)
  const resetBeltState = useConveyorBeltPart(selectResetBeltState)
  const resetExtruderState = useExtruderPart(selectResetExtruderState)
  const resetStamperState = useStamperPart(selectResetStamperState)
  const resetOvenState = useOvenPart(selectResetOvenState)
  const resetBoxState = useCollectionBoxPart(selectResetBoxState)

  const resetAllStates = useCallback(() => {
    resetMachineState()
    resetSwitchState()
    resetMotorState()
    resetBeltState()
    resetExtruderState()
    resetStamperState()
    resetOvenState()
    resetBoxState()
  }, [
    resetMachineState,
    resetSwitchState,
    resetMotorState,
    resetBeltState,
    resetExtruderState,
    resetStamperState,
    resetOvenState,
    resetBoxState,
  ])


  const [gameOverType, setGameOverType] = useState<'won' | 'lost' | 'play'>('play')
  const [totalScore, setTotalScore] = useState(0)
  const [totalCollectedBiscuits, setTotalCollectedBiscuits] = useState(0)

  const onGameOver = useCallback<MachineProps['onGameOver']>((isOvenALive, totalScore, totalCollectedBiscuits) => {
    setGameOverType(isOvenALive ? 'won' : 'lost')
    setTotalScore(totalScore)
    setTotalCollectedBiscuits(totalCollectedBiscuits)
  }, [])


  const onPlayAgain = useCallback(() => {
    setGameOverType('play')
    setTotalScore(0)
    setTotalCollectedBiscuits(0)
    resetAllStates()
  }, [resetAllStates])


  return (
    <StyledApp className="bg-yellow-200 h-screen">
      <Title />

      <SoundControls className="absolute right-20" />

      <Machine
        testIdPrefix="BiscuitMachine"
        onGameOver={onGameOver}
      />

      <ModalWon
        isOpen={gameOverType === 'won'}
        totalScore={totalScore}
        totalCollectedBiscuits={totalCollectedBiscuits}
        onPlayAgain={onPlayAgain}
      />

      <ModalLost
        isOpen={gameOverType === 'lost'}
        totalScore={totalScore}
        totalCollectedBiscuits={totalCollectedBiscuits}
        onPlayAgain={onPlayAgain}
      />

      <Footer />
    </StyledApp>
  )
}


export default App
