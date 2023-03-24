const StartPage = (props) => {
  const { handleGameStart, level, setLevel } = props;

  return (
    <div className="start-page">
      <span>Welcome to Pokémon MemGame :D</span>
      <span>To progress, do not click the same Pokémon twice.</span>
      <span>Complete level 20 to win! Goodluck!</span>
      <p>*you may also choose which level to start from*</p>
      <div className="start-buttons">
        <select
          name="levels"
          id="pokeLevels"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <button onClick={handleGameStart}>Game Start!</button>
      </div>
    </div>
  );
};

export default StartPage;
