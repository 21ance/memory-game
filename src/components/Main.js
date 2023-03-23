import Card from "./body/Card";
import Loading from "./body/Loading";
import { useEffect, useState } from "react";

const Main = () => {
  const [list, setList] = useState([]);
  const [pokeQuantity, setPokeQuantity] = useState(6);
  const [pokeID, setPokeID] = useState([...Array(150).keys()]);
  const [score, setScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setisLoading] = useState(false);

  async function fetchPokemonAPI(id) {
    try {
      const pokeFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokeResponse = await pokeFetch.json();
      const pokeObject = {
        id: pokeResponse.id,
        name: pokeResponse.name,
        image: pokeResponse.sprites.front_default,
      };
      setList((prev) => [...prev, pokeObject]);
    } catch (error) {
      console.log(error);
    }
  }

  function fetchPokemons() {
    for (let i = 0; i < pokeQuantity; i++) {
      const randomNumber = Math.floor(Math.random() * pokeID.length) + 1;
      setPokeID(...pokeID, pokeID.splice(randomNumber, 1));
      fetchPokemonAPI(randomNumber);
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, [pokeQuantity]);

  return (
    <main>
      {console.log(list)}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="score-board">
            <span>Score: {score}</span>
            <span>Best Score: {bestScore}</span>
          </div>

          <div className="card-container">
            {list.map((character) => {
              return (
                <Card
                  name={character.name}
                  image={character.image}
                  key={character.id}
                  clickedCards={clickedCards}
                  setClickedCards={setClickedCards}
                  score={score}
                  setScore={setScore}
                  bestScore={bestScore}
                  setBestScore={setBestScore}
                  list={list}
                  setList={setList}
                />
              );
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default Main;
