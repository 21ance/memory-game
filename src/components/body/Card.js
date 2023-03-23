const Card = (props) => {
  const { name, image, handleCardClick } = props;

  return (
    <div className="card" onClick={() => handleCardClick(name)}>
      <img className="disable-pointer" src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Card;
