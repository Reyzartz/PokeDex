import { pokemon } from "types/pokemon.type";
import { VariableSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styles from "styles/card.module.css";

type PokemonlistProps = {
  pokemonList: pokemon[];
};

const getPokemonID = (id: number) => {
  const pokemonIdLength = id.toString().length;
  switch (pokemonIdLength) {
    case 1:
      return `00${id}`;
    case 2:
      return `0${id}`;
    default:
      return `${id}`;
  }
};

const Pokemonlist = ({ pokemonList }: PokemonlistProps) => {
  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    const index = rowIndex * 4 + columnIndex;
    if (index > pokemonList.length - 1) {
      return null;
    }
    const { name, id } = pokemonList[index] || {};
    return (
      <div
        style={style}
        className="flex flex-col items-center"
        data-testid="pokemon-card"
      >
        <div className={styles.card}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
          />
        </div>
        <h6 className="bg-gray-900 text-gray-50 uppercase w-48 px-4 py-1 m-1 rounded">
          {name} - #<span className="font-semibold">{getPokemonID(id)}</span>
        </h6>
      </div>
    );
  };
  const rowCount = Math.ceil(pokemonList.length / 4);
  return (
    <div style={{ height: "calc(100vh - 15rem)" }}>
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <Grid
            columnCount={4}
            columnWidth={() => width / 4.1}
            height={height}
            rowCount={rowCount}
            rowHeight={() => 200}
            width={width}
          >
            {Cell}
          </Grid>
        )}
      </AutoSizer>
    </div>
  );
};

export default Pokemonlist;
