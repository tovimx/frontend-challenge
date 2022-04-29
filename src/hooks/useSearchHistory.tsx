import React, { useEffect, useState } from "react";
export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem("searchTerms")) ?? []
  );

  useEffect(() => {
    const searchTerms = localStorage.getItem("searchTerms");
    if (searchTerms) {
      setSearchHistory(JSON.parse(searchTerms));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerms", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const updateSearchHistory = (query: string) => {
    if (searchHistory.length && searchHistory.includes(query)) {
      const termIndex = searchHistory.indexOf(query);
      if (termIndex) {
        // if termIndex is not the first term in the seach history replace it to be at the beginning of the list like normal search history does
        searchHistory.splice(termIndex, 1);
        setSearchHistory([query, ...searchHistory]);
      } else {
        setSearchHistory(searchHistory);
      }
    } else {
      setSearchHistory([query, ...searchHistory]);
    }
  };

  return { searchHistory, setSearchHistory, updateSearchHistory } as const;
};
