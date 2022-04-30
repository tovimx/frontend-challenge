import React from "react";
import { List } from "../";
import { useSearchHistory } from "../../hooks/useSearchHistory";
import "./SearchHistory.scss";

type SearchHistoryProps = {
  onSelectTerm: (query: string) => void;
};
export const SearchHistory: React.FC<SearchHistoryProps> = ({
  onSelectTerm,
}) => {
  const { searchHistory, deleteTerm } = useSearchHistory();

  return (
    <List className="search-history">
      {searchHistory.map((term, index) => (
        <li className="search-history_item" key={`term-${index}`}>
          <span
            className="search-history_text text-bold"
            onClick={() => onSelectTerm(term)}
          >
            {term}
          </span>
          <span
            className="search-history_action--grey"
            onClick={() => {
              console.log("x");
              deleteTerm(term);
            }}
          >
            x
          </span>
        </li>
      ))}
    </List>
  );
};
