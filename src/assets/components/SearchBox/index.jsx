import { useEffect, useRef, useState } from "react";
import "./style.css";

export default function SearchBox({ onSearch }) {
  const inputRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchTerm !== "") {
        setIsFilled(true);
        onSearch(searchTerm);
      } else {
        setIsFilled(false);
      }
    }, 1000);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [searchTerm, onSearch]);
  return (
    <div className="search-box-wrapper">
      <input
        ref={inputRef}
        type="search"
        onChange={(e) => setSearchTerm(e.target.value)}
        // onKeyDown={handleKeyDown}
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
