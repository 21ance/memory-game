const Scoreboard = (props) => {
  const { streak, bestStreak, level } = props;

  return (
    <div className="score-board">
      <span>Streak: {streak}</span>
      <span>Best Streak: {bestStreak}</span>
      <h1>Level: {level}</h1>
    </div>
  );
};

export default Scoreboard;
