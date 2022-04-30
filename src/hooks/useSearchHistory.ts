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

  const updateTerms = (query: string) => {
    const termIndex = searchHistory.indexOf(query);
    const searchHistoryCopy = [...searchHistory];
    if (termIndex) {
      // if termIndex is not the first term in the seach history replace it to be at the beginning of the list like normal search history does
      searchHistoryCopy.splice(termIndex, 1);
    }
    setSearchHistory([query, ...searchHistoryCopy]);
  }

  const deleteTerm = (query: string) => {
    const termIndex = searchHistory.indexOf(query);
    const searchHistoryCopy = [...searchHistory];
    searchHistoryCopy.splice(termIndex, 1);
    console.log('searchHistoryCopy', searchHistoryCopy);
    setSearchHistory(searchHistoryCopy);
  }

  const updateSearchHistory = (query: string) => {
    if (searchHistory.length && searchHistory.includes(query)) {
      // if the user uses a query that already existed in the search history terms remove duplicate
      if (searchHistory.indexOf(query) !== 0) { 
        // if the query is NOT the first term delete the term from history and add most recent used term to the top of the history
        updateTerms(query);
      } else {
          // if the query IS the first term, do not update the history
          setSearchHistory(searchHistory);
        }

    } else {
      // if the user uses a new query add it at the top of the history
      setSearchHistory([query, ...searchHistory]);
    }
  };

  return { searchHistory, setSearchHistory, updateSearchHistory, deleteTerm } as const;
};
