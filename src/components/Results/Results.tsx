import React from "react";
import { List } from "..";
import { SearchResult } from "../../types";
import { ResultItem } from "../Result/Result";

type ResultsProps = {
  results: SearchResult[];
};

export const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <List className="results">
      {results.map((result) => (
        <ResultItem {...result} />
      ))}
    </List>
  );
};
