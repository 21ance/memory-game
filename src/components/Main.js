import Card from "./body/Card";
import Loading from "./body/Loading";
import Scoreboard from "./body/Scoreboard";
import StartPage from "./body/StartPage";
import { useEffect, useState } from "react";

const Main = () => {
  const [list, setList] = useState([]);
  const [pokeQuantity, setPokeQuantity] = useState(1);
  const [pokeID, setPokeID] = useState([...Array(151).keys()]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStartPage, setIsStartPage] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!isStartPage) {
      fetchPokemons();
    }
    // eslint-disable-next-line
  }, [pokeQuantity, isStartPage]);

  useEffect(() => {
    if (clickedCards.length === pokeQuantity) {
      setClickedCards([]);
      setList([]);
      setPokeQuantity((prev) => prev + 1);
    }
    if (score > bestScore) setBestScore(score);
  }, [clickedCards, score, bestScore, pokeQuantity]);

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
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  }

  function fetchPokemons() {
    for (let i = 0; i < pokeQuantity; i++) {
      const randomIndex = Math.floor(Math.random() * pokeID.length);
      fetchPokemonAPI(pokeID[randomIndex] + 1);
      setPokeID([...pokeID, pokeID.splice(randomIndex, 1)]);
    }
  }

  function handleCardClick(name) {
    setList(list.sort((a, b) => 0.5 - Math.random()));
    setClickedCards([...clickedCards, name]);
    setScore(score + 1);

    if (clickedCards.includes(name)) {
      gameOver();
    }
  }

  function gameOver() {
    setScore(0);
    setClickedCards([]);
    setPokeQuantity(1);
    setList([]);
    setPokeID([...Array(151).keys()]);
  }

  function handleGameStart() {
    console.log("game start");
    setIsStartPage(false);
  }

  return (
    <main>
      {isStartPage && (
        <StartPage
          handleGameStart={handleGameStart}
          level={pokeQuantity}
          setLevel={setPokeQuantity}
        />
      )}
      {isLoading && !isStartPage && <Loading />}
      {!isLoading && !isStartPage && (
        <>
          <Scoreboard
            score={score}
            bestScore={bestScore}
            level={pokeQuantity}
          />
          <div className="card-container">
            {list.map((character) => {
              return (
                <Card
                  key={character.id}
                  name={character.name}
                  image={character.image}
                  handleCardClick={handleCardClick}
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
