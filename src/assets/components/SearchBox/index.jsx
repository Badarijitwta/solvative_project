import { useEffect, useRef, useState } from "react";
import "./style.css";
// import React from 'react'

export default function SearchBox({ query, setQuery }) {
  const inputRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = (e) => {
    setQuery(e.target.value);
    setIsFilled(!!e.target.value);
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    // return () => {
    //   window.removeEventListener("keydown", handleGlobalKeyDown);
    // };
  }, []); // Empty dependency array ensures the effect runs only once

  const handleSearch = async () => {
    // Perform search operation
    // Example: const data = await fetchData(query);
    // setResults(data);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="search-box-wrapper">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => handleChange(e)}
        // onKeyPress={handleKeyPress}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder="Search places..."
        className={`search-input ${isFilled ? "filled" : ""} ${
          isFocused ? "focused" : ""
        }`}
      />
      <button id="cmd-button" onClick={() => inputRef.current.focus()}>
        Ctrl + /
      </button>
    </div>
  );
}
