import Card from "./body/Card";
import { useEffect, useState } from "react";

const Main = (props) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (list.length === 0) {
      (async () => {
        const pokeCall = await fetch("https://pokeapi.co/api/v2/pokemon/151");
        const response = await pokeCall.json();

        const pokeObject = {
          name: response.name,
          image: response.sprites.front_default,
          id: response.id,
        };

        const newList = [...list, pokeObject];
        setList(newList);
      })();
    }
  }, [list]);

  return (
    <main>
      {list.map((character) => {
        return (
          <Card
            name={character.name}
            image={character.image}
            key={character.id}
          />
        );
      })}
    </main>
  );
};

export default Main;
