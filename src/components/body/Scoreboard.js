const Scoreboard = (props) => {
  const { score, bestScore, level } = props;

  return (
    <div className="score-board">
      <span>Score: {score}</span>
      <span>Best Score: {bestScore}</span>
      <h1>Level: {level}</h1>
    </div>
  );
};

export default Scoreboard;
