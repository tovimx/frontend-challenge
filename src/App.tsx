import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.scss";
import { fetchResults } from "./utils";
import { Results, SearchHistory } from "./components";
import { useSearchHistory } from "./hooks/useSearchHistory";
import { SearchResult } from "./types";

export const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { updateSearchHistory } = useSearchHistory();
  const ref = useRef(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setMessage("");
    }
    const delayDebounceFn = setTimeout(async () => {
      if (query) {
        try {
          const { results } = await fetchResults(query);
          updateSearchHistory(query);
          if (results.length) {
            setMessage("");
            setResults(results);
          } else {
            setMessage("no results found");
            setResults([]);
          }
        } catch (e) {
          setMessage("Error in search :C please try again");
          console.error(e);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  /* handle focus outside input to hide history */
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const displaySeachHistory = !message && !query && showHistory;

  const onChangeHandler = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const displayHistory = useCallback(() => {
    setShowHistory(true);
  }, []);

  return (
    <div className="search-box" ref={ref}>
      <input
        className="search-input"
        aria-autocomplete="both"
        aria-labelledby="search-input"
        id="search-input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search artist"
        type="search"
        value={query}
        onChange={onChangeHandler}
        onFocus={displayHistory}
      />
      <Results results={results} />
      {displaySeachHistory && <SearchHistory onSelectTerm={setQuery} />}
      {message && <span className="message">{message}</span>}
    </div>
  );
};
