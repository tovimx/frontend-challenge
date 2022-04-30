import React, { useState, useEffect, useRef, useCallback } from "react";
import "./styles.scss";
import { fetchResults } from "./utils";
import { Results, SearchHistory } from "./components";
import { useSearchHistory, useClickOutsite } from "./hooks";
import { SearchResult } from "./types";

export const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { updateSearchHistory } = useSearchHistory();
  const [inputRef] = useClickOutsite(() => {
    setShowHistory(false);
  });

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

  const displaySeachHistory = !message && !query && showHistory;

  const onChangeHandler = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const displayHistory = useCallback(() => {
    setShowHistory(true);
  }, []);

  return (
    <div className="search-box" ref={inputRef}>
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
