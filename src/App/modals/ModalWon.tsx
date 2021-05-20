import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Confetti, { ConfettiConfig } from 'react-dom-confetti'
import styled from '@emotion/styled'

import { Button } from '@src/components'

import Scoreboard from './Scoreboard'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')


const confettiConfig: ConfettiConfig = {
  angle: 360,
  spread: 360,
  startVelocity: 40,
  elementCount: 200,
  dragFriction: 0.1,
  duration: 3000,
  stagger: 10,
  width: '10px',
  height: '10px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

const modalWidth = 600
const style = {
  overlay: {
    zIndex: 20,
  },
  content: {
    top: '150px',
    bottom: 'auto',
    left: `calc(50% - ${modalWidth / 2}px)`,
    right: 'auto',
    width: `${modalWidth}px`,
  },
}

const Header = styled.div`
  text-shadow: #AF0 1px 0 5px;
`

type ModalWonProps = {
  testIdPrefix?: string
  isOpen: boolean
  totalScore: number
  totalCollectedBiscuits: number
  onPlayAgain: () => void
}


const ModalWon = ({
  testIdPrefix,
  isOpen,
  totalScore,
  totalCollectedBiscuits,
  onPlayAgain,
}: ModalWonProps) => {
  const [isConfettiActive, setIsConfettiActive] = useState(false)

  useEffect(() => {
    let timer
    if (isOpen) {
      timer = setTimeout(() => setIsConfettiActive(true), 2000)
    }
    return () => clearTimeout(timer)
  }, [isOpen])


  return (
    <div>
      <Modal
        isOpen={isOpen}
        style={style}
      >
        <div data-testid={`${testIdPrefix}.ModalWon.Content`}>
          <div className="text-xs text-center mb-4">
            Congrats!
          </div>

          <Header className="text-7xl text-green-600 font-extrabold text-center uppercase">
            You Won {String(isConfettiActive)}
          </Header>

          <Scoreboard
            testIdPrefix={`${testIdPrefix}.ModalWon`}
            className="w-64 my-10 mx-auto"
            totalScore={totalScore}
            totalCollectedBiscuits={totalCollectedBiscuits}
          />

          <div className="text-xs text-center">
            Ready to try again?
          </div>

          <div className="flex justify-center my-2">
            <Button
              testIdPrefix={`${testIdPrefix}.ModalWon.PlayAgainButton`}
              variant="primary"
              onClick={onPlayAgain}
            >
              Play again
            </Button>
          </div>
        </div>
      </Modal>


      <div className=" absolute left-1/2 top-1/3 z-40">
        <Confetti
          active={isConfettiActive}
          config={confettiConfig}
        />
      </div>
    </div>
  )
}


ModalWon.propTypes = {
  testIdPrefix: PropTypes.string,
  isOpen: PropTypes.bool,
  totalScore: PropTypes.number,
  totalCollectedBiscuits: PropTypes.number,
  onPlayAgain: PropTypes.func,
}

ModalWon.defaultProps = {
  testIdPrefix: 'Test',
  isOpen: false,
  totalScore: 0,
  totalCollectedBiscuits: 0,
  onPlayAgain: () => {},
}

ModalWon.displayName = 'ModalWon'


export default ModalWon
