import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import Sound from 'react-sound'

import { Button } from '@src/components'

import useSfx, { selectVolume } from '@src/globalState/useSfx'

import SoundFileUrl from './sounds/gameOverLost.wav'
import Scoreboard from './Scoreboard'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

const modalWidth = 600
const style = {
  overlay: {
    zIndex: 20,
    overflow: 'hidden',
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
}: ModalLostProps) => {
  const { t } = useTranslation()
  const sfxVolume = useSfx(selectVolume)

  return (
    <div>
      <Modal
        isOpen={isOpen}
        style={style}
      >
        <div data-testid={`${testIdPrefix}.ModalLost.Content`}>
          <div className="text-xs text-center mb-4">
            {t('ModalLost.encourage')}
          </div>

          <Header
            data-testid={`${testIdPrefix}.ModalLost.Header`}
            className="text-7xl text-red-600 font-extrabold text-center uppercase"
          >
            {t('ModalLost.Header')}
          </Header>

          <Scoreboard
            testIdPrefix={`${testIdPrefix}.ModalLost`}
            className="w-96 my-10 mx-auto"
            totalScore={totalScore}
            totalCollectedBiscuits={totalCollectedBiscuits}
          />

          <div className="text-xs text-center">
            {t('ModalLost.playAgain')}
          </div>

          <div className="flex justify-center my-2">
            <Button
              testIdPrefix={`${testIdPrefix}.ModalLost.PlayAgainButton`}
              variant="primary"
              onClick={onPlayAgain}
            >
              {t('ModalLost.PlayAgainButton')}
            </Button>
          </div>
        </div>
      </Modal>


      <Sound
        url={SoundFileUrl}
        volume={sfxVolume}
        playStatus={isOpen ? 'PLAYING' : 'STOPPED'}
      />
    </div>
  )
}


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
