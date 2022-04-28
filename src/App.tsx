import React, { useState, useEffect } from "react";
import "./styles.scss";
import { fetchResults } from "./utils";
import { ResultItem } from "./components/Result";

type SearchResult = {
  cover_image: string;
  title: string;
  year: string;
  type: string;
};

export const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!query) {
      setResults([]);
      setMessage("");
    }
    const delayDebounceFn = setTimeout(async () => {
      if (query) {
        try {
          const { results } = await fetchResults(query);
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

  return (
    <div className="search-box">
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
        onChange={(e) => setQuery(e.target.value)}
      />
      {!results.length || (
        <section className="results">
          <ul className="results_group">
            {results.map((result) => (
              <ResultItem {...result} />
            ))}
          </ul>
        </section>
      )}
      {message && <span className="message">{message}</span>}
    </div>
  );
};
