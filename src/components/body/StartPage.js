const StartPage = (props) => {
  const { handleGameStart, level, setLevel, bestStreak, bestLevel } = props;
  const levels = [...Array(10).keys()];

  return (
    <div className="start-page">
      <span>Welcome to Pokémon MemGame :D</span>
      <span>To progress, do not click the same Pokémon twice.</span>
      <span>Complete level 10 to win! Goodluck!</span>
      <div className="start-buttons">
        <select
          name="levels"
          id="pokeLevels"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        >
          {levels.map((lev) => {
            return (
              <option value={lev + 1} key={lev}>
                {lev + 1}
              </option>
            );
          })}
        </select>
        <button onClick={handleGameStart}>Game Start!</button>
      </div>
      {bestStreak !== 0 ? (
        <>
          <p>Your best level: {bestLevel}</p>
          <p>Your longest streak: {bestStreak}</p>
        </>
      ) : (
        <p>Your best level and longest streak will be recorded here</p>
      )}
    </div>
  );
};

export default StartPage;
