import React, { useEffect, useState } from "react";
import { List } from "../";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import "./SearchHistory.scss";

type SearchHistoryProps = {
  onSelectTerm: (query: string) => void;
};
export const SearchHistory: React.FC<SearchHistoryProps> = ({
  onSelectTerm,
}) => {
  const { searchHistory } = useSearchHistory();

  return (
    <List className="search-history">
      {searchHistory.map((term, key) => (
        <li
          className="search-history-term"
          onClick={() => onSelectTerm(term)}
          key={`term-${key}`}
        >
          <span className="text-bold">{term}</span>
        </li>
      ))}
    </List>
  );
};
