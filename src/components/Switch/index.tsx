import { ChangeEvent, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { ReactSoundProps } from 'react-sound'
import styled from '@emotion/styled'

import SwitchSound from './SwitchSound'

const FOREGROUND_COLOR = '#17181c'
const BACKGROUND_COLOR = '#e3e4e8'
const TRANSITION_DURATION = '0.3s'

/**
 * Credit goes to:
 *   https://codepen.io/jkantner/pen/PoPvoGK?editors=1100
 */
const Wrap = styled.div`
  background-color: ${BACKGROUND_COLOR};
  background-image: linear-gradient(90deg, #0000003f, transparent);
  display: inline-block;
  padding: 30px 50px 20px 50px;
  border: 5px solid #b9bbc6;
  border-radius: 30px;
  box-shadow: inset 0px 0px 10px 0px black;

  form {
    display: flex;
    margin: auto;
    max-width: 24em;
    padding: 0 1.5em;
  }

  label {
    display: block;
    color: ${FOREGROUND_COLOR};
    text-align: center;
    -webkit-tap-highlight-color: transparent;
    width: 80px;
  }

  label:first-of-type input {
    border-radius: 0.5em 0 0 0.5em;
    box-shadow:
      0.1em 0 0 #2726267f inset,
      -0.1em 0 0 #27262600 inset,
      0 0.1em 0 #afa490 inset,
      0 -0.1em 0 #ffffff3f,
      0 0.2em 0.5em #0000007f,
      0 -0.1em 0 #926086 inset,
      -0.1em -0.2em 0 #ffffff7f inset,
      0.2em 0 0 #ffffff7f inset;
  }

  label:last-child input {
    border-radius: 0 0.5em 0.5em 0;
    box-shadow:
      0 -0.1em 0 #926086 inset,
      0.1em 0 0 #2726267f inset,
      -0.1em 0 0 #2726267f inset,
      0 0.1em 0 #afa490 inset,
      -0.1em 0 0 #afa490 inset,
      0 -0.1em 0 #ffffff3f,
      0 0.2em 0.5em #0000007f,
      -0.1em -0.1em 0 0.1em #ffffff7f inset;
  }

  label:first-of-type input:checked {
    box-shadow:
      0.1em 0 0 #272626af inset,
      -0.1em 0 0 #272626 inset,
      0 0.1em 0 #847a62 inset,
      0 -0.1em 0 #ffffff3f,
      0 0.1em 0 #ffffff7f,
      0 -0.1em 0 #722257 inset,
      -0.1em -0.2em 0 #ffffff7f inset,
      0.2em 0 0 #ffffff7f inset;
  }

  label:last-child input:checked {
    box-shadow:
      0.1em 0 0 #272626af inset,
      -0.1em 0 0 #272626 inset,
      0 -0.1em 0 #722257 inset,
      0 0.1em 0 #847a62 inset,
      -0.1em 0 0 #847a62 inset,
      0 -0.1em 0 #ffffff3f,
      0 0.1em 0 #ffffff7f,
      -0.1em -0.1em 0 0.1em #ffffff7f inset;
  }

  input {
    color: ${FOREGROUND_COLOR};
    background-image: linear-gradient(#ffffff 33%,#414751 58%,#837b52,#c5baa1,#c3adaa);
    border-radius: 0;
    box-shadow:
      0.1em 0 0 #2726267f inset,
      -0.1em 0 0 #27262600 inset,
      0 0.1em 0 #afa490 inset,
      0 -0.1em 0 #ffffff3f,
      0 0.2em 0.5em #0000007f,
      0 -0.1em 0 #926086 inset,
      -0.1em -0.2em 0 #ffffff7f inset;
    cursor: pointer;
    display: block;
    margin-bottom: 0.5em;
    width: 100%;
    height: 1em;
    transition: box-shadow ${TRANSITION_DURATION} ease-in-out;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input:checked {
    background-image: linear-gradient(#ffffff 33%,#414751 58%,#827a7b,#c0b6ac,#c3adaa);
    box-shadow:
      0.1em 0 0 #272626af inset,
      -0.1em 0 0 #272626 inset,
      0 0.1em 0 #847a62 inset,
      0 -0.1em 0 #ffffff3f,
      0 0.1em 0 #ffffff7f,
      0 -0.1em 0 #722257 inset,
      -0.1em -0.2em 0 #ffffff7f inset;
  }

  input:checked + span {
    opacity: 0.8;
    font-weight: 500;
    text-shadow: 0px 0px 6px #333;
  }

  input:focus {
    outline: transparent;
  }

  input + span {
    opacity: 0.65;
    transition: opacity ${TRANSITION_DURATION} ease-in-out;
  }
`

export type SwitchProps = {
  testIdPrefix?: string
  className?: string
  value: 'on' | 'off' | 'pause'
  onChange: (value: SwitchProps['value']) => void
  disabled: boolean
}

const Switch = ({
  testIdPrefix,
  className,
  value,
  onChange,
  disabled,
}: SwitchProps) => {
  const { t } = useTranslation()

  const onChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSoundPlayStatus('PLAYING')
    onChange( event.target.value as SwitchProps['value'] )
  }, [onChange])


  const [soundPlayStatus, setSoundPlayStatus] = useState<ReactSoundProps['playStatus']>('STOPPED')
  const stopPlayStatus = useCallback(() => setSoundPlayStatus('STOPPED'), [])


  return (
    <div
      data-testid={`${testIdPrefix}.Switch`}
      className={className}
    >
      <Wrap>
        <form>
          <label>
            <input
              type="radio"
              name="value"
              value="on"
              onChange={onChangeInput}
              checked={value === 'on'}
              disabled={disabled}
            />
            <span>{t('Switch.On')}</span>
          </label>

          <label>
            <input
              type="radio"
              name="value"
              value="pause"
              onChange={onChangeInput}
              checked={value === 'pause'}
              disabled={disabled}
            />
            <span>{t('Switch.Pause')}</span>
          </label>

          <label>
            <input
              type="radio"
              name="value"
              value="off"
              onChange={onChangeInput}
              checked={value === 'off'}
              disabled={disabled}
            />
            <span>{t('Switch.Off')}</span>
          </label>
        </form>
      </Wrap>

      <SwitchSound
        playStatus={soundPlayStatus}
        onFinishedPlaying={stopPlayStatus}
      />
    </div>
  )
}


Switch.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOf(['on', 'off', 'pause']),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}

Switch.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  value: 'off',
  onChange: () => {},
  disabled: false,
}

Switch.displayName = 'Switch'


export default Switch
