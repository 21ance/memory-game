const Card = (props) => {
  function handleClick() {
    if (props.clickedCards.includes(props.name)) {
      console.log("game over");
      if (props.score > props.bestScore) {
        props.setBestScore(props.score);
      }
      props.setScore(0);
      props.setClickedCards([]);
      return;
    }
    console.log(props.list);
    const shuffledArray = props.list.sort((a, b) => 0.5 - Math.random());
    console.log(shuffledArray);

    props.setList(shuffledArray);
    props.setClickedCards([...props.clickedCards, props.name]);
    props.setScore(props.score + 1);
  }

  return (
    <div className="card" onClick={handleClick}>
      <img className="disable-pointer" src={props.image} alt={props.name} />
      <p>{props.name}</p>
    </div>
  );
};

export default Card;
