import React, { useEffect, useRef, useState } from "react";
import { pokemon } from "types/pokemon.type";
import useLocalStorage from "utils/hooks/useLocalStorage";

type searchBarProps = {
  pokemonList: pokemon[];
  filteredList: pokemon[];
  setFilterList: React.Dispatch<React.SetStateAction<pokemon[]>>;
};

const searchIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 m-auto text-red-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const SearchBar = ({
  pokemonList,
  filteredList,
  setFilterList,
}: searchBarProps) => {
  const [searchInput, setSearchInput] = useLocalStorage("searchInput", "");
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null!);

  const searchInputHander = (value?: string) => {
    const searchValue = value || inputRef.current.value;
    setSearchInput(searchValue);
    setFilterList(
      pokemonList.filter((pokemon) =>
        pokemon.name.match(RegExp(`^${searchValue}`, "i"))
      )
    );
    if (value || !searchValue) setShowAutoComplete(false);
    else if (!showAutoComplete) setShowAutoComplete(true);
  };

  useEffect(() => {
    searchInputHander();
  }, []);

  return (
    <div className="relative">
      <div className="h-12 flex gap-4">
        <input
          type="text"
          ref={inputRef}
          onChange={() => searchInputHander()}
          value={searchInput}
          className="h-full flex-grow py-4 px-6 rounded outline-none focus:bg-blue-100 focus:border-t-2"
          placeholder="Search Pokemon"
          data-testid="search-input"
        />
        <button
          className="w-14 bg-gray-50 rounded"
          onClick={() => setShowAutoComplete(false)}
          data-testid="search-btn"
        >
          {searchIcon}
        </button>
      </div>

      {showAutoComplete && (
        <div
          className="flex flex-col max-h-96 overflow-y-auto absolute w-full z-50"
          data-testid="search-autocomplete"
        >
          {filteredList.map((item) => (
            <div
              key={item.name}
              className="bg-white mr-2 border-b-2 py-3 px-6 cursor-pointer hover:bg-blue-50 bg-opacity-80"
              onClick={() => searchInputHander(item.name)}
              data-testid="search-autocomplete-options"
            >
              <span className="font-bold">{searchInput}</span>
              <span>
                {item.name.replace(RegExp(`^${searchInput}`, "i"), "")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
