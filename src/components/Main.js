import Card from "./body/Card";
import Loading from "./body/Loading";
import Scoreboard from "./body/Scoreboard";
import StartPage from "./body/StartPage";
import Winner from "./body/Winner";
import { useEffect, useState } from "react";

const Main = () => {
  const [list, setList] = useState([]);
  const [pokeQuantity, setPokeQuantity] = useState(1);
  const [pokeID, setPokeID] = useState([...Array(151).keys()]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(() => {
    if (JSON.parse(localStorage.getItem("bestStreak")) !== null) {
      return JSON.parse(localStorage.getItem("bestStreak"));
    }
    return 0;
  });
  const [bestLevel, setBestLevel] = useState(() => {
    if (JSON.parse(localStorage.getItem("bestLevel")) !== null) {
      return JSON.parse(localStorage.getItem("bestLevel"));
    }
    return 1;
  });
  const [clickedCards, setClickedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStartPage, setIsStartPage] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!isStartPage) {
      setIsLoading(true);
      fetchPokemons();
    }
    // eslint-disable-next-line
  }, [pokeQuantity, isStartPage]);

  useEffect(() => {
    if (pokeQuantity === 11) {
      gameOver();
      setIsGameOver(true);
    }

    if (clickedCards.length === pokeQuantity) {
      setClickedCards([]);
      setList([]);
      setPokeQuantity((prev) => prev + 1);
    }
    if (streak > bestStreak) {
      setBestStreak(streak);
      localStorage.setItem("bestStreak", JSON.stringify(streak));
    }

    if (clickedCards.length > bestLevel) {
      setBestLevel(pokeQuantity);
      localStorage.setItem("bestLevel", JSON.stringify(pokeQuantity));
    }
  }, [clickedCards, streak, bestStreak, pokeQuantity, bestLevel]);

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
    setStreak(streak + 1);

    if (clickedCards.includes(name)) {
      gameOver();
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsStartPage(true);
      }, 500);
    }
  }

  function gameOver() {
    setStreak(0);
    setClickedCards([]);
    setPokeQuantity(1);
    setList([]);
    setPokeID([...Array(151).keys()]);
  }

  function handleGameStart() {
    setIsStartPage(false);
  }

  return (
    <main>
      {isGameOver && <Winner />}
      {isLoading && <Loading />}
      {isStartPage && !isLoading && !isGameOver && (
        <StartPage
          handleGameStart={handleGameStart}
          level={pokeQuantity}
          setLevel={setPokeQuantity}
          bestStreak={bestStreak}
          bestLevel={bestLevel}
        />
      )}
      {!isLoading && !isStartPage && (
        <>
          <Scoreboard
            streak={streak}
            bestStreak={bestStreak}
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
