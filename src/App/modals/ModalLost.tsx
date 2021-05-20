import PropTypes from 'prop-types'
import Modal from 'react-modal'
import styled from '@emotion/styled'

import { Button } from '@src/components'

import Scoreboard from './Scoreboard'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

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
  text-shadow: #F0A 1px 0 5px;
`

type ModalLostProps = {
  testIdPrefix?: string
  isOpen: boolean
  totalScore: number
  totalCollectedBiscuits: number
  onPlayAgain: () => void
}


const ModalLost = ({
  testIdPrefix,
  isOpen,
  totalScore,
  totalCollectedBiscuits,
  onPlayAgain,
}: ModalLostProps) => (
  <Modal
    isOpen={isOpen}
    style={style}
  >
    <div data-testid={`${testIdPrefix}.ModalLost.Content`}>
      <div className="text-xs text-center mb-4">
        Better luck next time
      </div>

      <Header className="text-7xl text-red-600 font-extrabold text-center uppercase">
        Game Over
      </Header>

      <Scoreboard
        testIdPrefix={`${testIdPrefix}.ModalLost`}
        className="w-64 my-10 mx-auto"
        totalScore={totalScore}
        totalCollectedBiscuits={totalCollectedBiscuits}
      />

      <div className="text-xs text-center">
        Ready to try again?
      </div>

      <div className="flex justify-center my-2">
        <Button
          testIdPrefix={`${testIdPrefix}.ModalLost.PlayAgainButton`}
          variant="primary"
          onClick={onPlayAgain}
        >
          Play again
        </Button>
      </div>
    </div>
  </Modal>
)


ModalLost.propTypes = {
  testIdPrefix: PropTypes.string,
  isOpen: PropTypes.bool,
  totalScore: PropTypes.number,
  totalCollectedBiscuits: PropTypes.number,
  onPlayAgain: PropTypes.func,
}

ModalLost.defaultProps = {
  testIdPrefix: 'Test',
  isOpen: false,
  totalScore: 0,
  totalCollectedBiscuits: 0,
  onPlayAgain: () => {},
}

ModalLost.displayName = 'ModalLost'


export default ModalLost
