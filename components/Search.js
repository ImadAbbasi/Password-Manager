import React, { useState } from "react";

const Search = ({ onSearch, clear }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
          className="py-2 px-4 rounded-md w-full md:w-2/3 focus:outline-blue-400 border-none"
        />
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className="py-1 px-3 border-2 border-blue-400 bg-blue-400 hover:bg-inherit text-sm md:text-base hover:text-blue-400 rounded-md text-white font-semibold transition-all duration-300 shadow-md"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            type="button"
            className="py-1 px-3 border-2 border-fuchsia-400 bg-fuchsia-400 hover:bg-inherit text-sm md:text-base hover:text-fuchsia-400 rounded-md text-white font-semibold transition-all duration-300 shadow-md"
            onClick={() => clear()}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
