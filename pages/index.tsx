import Pokemonlist from "components/PokemonList";
import SearchBar from "components/SearchBar";
import { useState } from "react";
import { pokemonData, pokemon } from "types/pokemon.type";

type HomeProps = {
  pokemonList: pokemon[];
};

const Home = ({ pokemonList }: HomeProps) => {
  const [filteredList, setFilterList] = useState<pokemon[]>(pokemonList);

  return (
    <main className="min-h-screen bg-red-500 py-10">
      <div className="max-w-screen-lg m-auto flex flex-col gap-8">
        <header>
          <h1 className="text-5xl font-bold text-center">
            <span className="text-gray-50">Poke</span>Dex
          </h1>
        </header>
        <SearchBar
          pokemonList={pokemonList}
          filteredList={filteredList}
          setFilterList={setFilterList}
        />
        <Pokemonlist pokemonList={filteredList} />
      </div>
    </main>
  );
};

export default Home;

export const getStaticProps = async () => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898"
  );
  const data = await response.json();
  const pokemonList: pokemon[] = data.results.map(
    (pokemon: pokemonData, index: number) => ({
      name: pokemon.name,
      id: index + 1,
    })
  );
  return {
    props: {
      pokemonList,
    },
  };
};
