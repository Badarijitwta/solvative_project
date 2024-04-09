import { useEffect, useRef, useState } from "react";
import "./style.css";
// import useDebounce from "../../hooks/useDebounce";

export default function SearchBox({ searchTerm, setSearchTerm }) {
  const inputRef = useRef(null);
  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setIsFilled(true);
  };

  return (
    <div className="search-box-wrapper">
      <input
        ref={inputRef}
        type="search"
        value={searchTerm}
        onChange={(e) => handleChange(e)}
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
