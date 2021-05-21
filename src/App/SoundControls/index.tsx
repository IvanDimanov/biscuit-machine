import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Sound from 'react-sound'

import useSfx, { selectVolume, selectSetVolume } from '@src/globalState/useSfx'


import ImageMusicOn from './images/musicOn.png'
import ImageMusicOff from './images/musicOff.png'
import ImageSfxOn from './images/sfxOn.png'
import ImageSfxOff from './images/sfxOff.png'

import GameMusicSoundFile from './sounds/gameMusic.wav'


type SoundControlsProps = {
  testIdPrefix?: string
  className?: string
}


const SoundControls = ({
  testIdPrefix,
  className,
}: SoundControlsProps) => {
  const { t } = useTranslation()

  const sfxVolume = useSfx(selectVolume)
  const setSfxVolume = useSfx(selectSetVolume)

  const toggleSfxVolume = useCallback(() => {
    setSfxVolume(sfxVolume === 100 ? 0 : 100)
  }, [setSfxVolume, sfxVolume])

  const [gameMusicVolume, setGameMusicVolume] = useState(0)
  const toggleGameMusicVolume = useCallback(() => setGameMusicVolume((state) => state === 100 ? 0 : 100), [])


  return (
    <div
      data-testid={`${testIdPrefix}.SoundControls`}
      className={className}
    >

      <div className="flex divide-x-2 divide-gray-600">
        <div
          data-testid={`${testIdPrefix}.SoundControls.GameMusic`}
          className="inline-block cursor-pointer opacity-80 hover:opacity-100 p-2"
          onClick={toggleGameMusicVolume}
        >
          {gameMusicVolume ? (
            <img
              data-testid={`${testIdPrefix}.SoundControls.GameMusic.OnButton`}
              className="w-10"
              src={ImageMusicOn}
              alt={t('SoundControls.GameMusic.OnButton')}
            />
          ) : (
            <img
              data-testid={`${testIdPrefix}.SoundControls.GameMusic.OffButton`}
              className="w-10"
              src={ImageMusicOff}
              alt={t('SoundControls.GameMusic.OffButton')}
            />
          )}
        </div>


        <div
          data-testid={`${testIdPrefix}.SoundControls.sfx`}
          className="inline-block cursor-pointer opacity-80 hover:opacity-100 p-2"
          onClick={toggleSfxVolume}
        >
          {sfxVolume ? (
            <img
              data-testid={`${testIdPrefix}.SoundControls.sfx.OnButton`}
              className="w-10"
              src={ImageSfxOn}
              alt={t('SoundControls.sfx.OnButton')}
            />
          ) : (
            <img
              data-testid={`${testIdPrefix}.SoundControls.sfx.OffButton`}
              className="w-10"
              src={ImageSfxOff}
              alt={t('SoundControls.sfx.OffButton')}
            />
          )}
        </div>
      </div>


      <Sound
        url={GameMusicSoundFile}
        loop
        volume={gameMusicVolume}
        playStatus={gameMusicVolume ? 'PLAYING' : 'STOPPED'}
      />
    </div>
  )
}


SoundControls.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
}

SoundControls.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
}

SoundControls.displayName = 'SoundControls'


export default SoundControls
