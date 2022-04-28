import React, { useState } from "react";
import "./styles.scss";

export const App = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="container">
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
    </div>
  );
};
