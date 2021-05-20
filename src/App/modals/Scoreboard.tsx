import PropTypes from 'prop-types'
import CountUp from 'react-countup'


const COUNT_UP_DURATION_IN_SECONDS = 3

type ScoreboardProps = {
  testIdPrefix?: string
  className?: string
  totalScore: number
  totalCollectedBiscuits: number
}


const Scoreboard = ({
  testIdPrefix,
  className,
  totalScore,
  totalCollectedBiscuits,
}: ScoreboardProps) => (
  <div
    data-testid={`${testIdPrefix}.Scoreboard`}
    className={className}
  >
    <div className="flex items-center justify-between border-t border-b border-gray-600 py-4 px-8">
      <div
        data-testid={`${testIdPrefix}.Scoreboard.TotalScoreLabel`}
        className="text-2xl"
      >
        Score:
      </div>

      <div
        data-testid={`${testIdPrefix}.Scoreboard.TotalScoreValue`}
        className="text-4xl text-green-500 font-bold"
      >
        <CountUp
          end={totalScore}
          decimals={2}
          duration={COUNT_UP_DURATION_IN_SECONDS}
        />
      </div>
    </div>

    <div className="flex items-center justify-between border-b border-gray-600 py-4 px-8">
      <div
        data-testid={`${testIdPrefix}.Scoreboard.totalCollectedBiscuitsLabel`}
        className="text-2xl"
      >
        Biscuits:
      </div>

      <div
        data-testid={`${testIdPrefix}.Scoreboard.totalCollectedBiscuitsValue`}
        className="text-4xl text-green-500 font-bold"
      >
        <CountUp
          end={totalCollectedBiscuits}
          duration={COUNT_UP_DURATION_IN_SECONDS}
        />
      </div>
    </div>
  </div>
)


Scoreboard.propTypes = {
  testIdPrefix: PropTypes.string,
  className: PropTypes.string,
  totalScore: PropTypes.number,
  totalCollectedBiscuits: PropTypes.number,
}

Scoreboard.defaultProps = {
  testIdPrefix: 'Test',
  className: undefined,
  totalScore: 0,
  totalCollectedBiscuits: 0,
}

Scoreboard.displayName = 'Scoreboard'


export default Scoreboard
