import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
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

      <div className="flex space-x-4">
        <div
          data-testid={`${testIdPrefix}.SoundControls.GameMusic`}
          className="inline-block cursor-pointer opacity-80 hover:opacity-100"
          onClick={toggleGameMusicVolume}
        >
          {gameMusicVolume ? (
            <img
              data-testid={`${testIdPrefix}.SoundControls.GameMusic.OnButton`}
              src={ImageMusicOn}
              alt="Game music is on"
            />
          ) : (
            <img
              data-testid={`${testIdPrefix}.SoundControls.GameMusic.OffButton`}
              src={ImageMusicOff}
              alt="Game music is off"
            />
          )}
        </div>


        <div
          data-testid={`${testIdPrefix}.SoundControls.sfx`}
          className="inline-block cursor-pointer opacity-80 hover:opacity-100"
          onClick={toggleSfxVolume}
        >
          {sfxVolume ? (
            <img
              data-testid={`${testIdPrefix}.SoundControls.sfx.OnButton`}
              src={ImageSfxOn}
              alt="Game sound effects are on"
            />
          ) : (
            <img
              data-testid={`${testIdPrefix}.SoundControls.sfx.OffButton`}
              src={ImageSfxOff}
              alt="Game sound effects are off"
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
