import React from "react";
import "./Result.scss";

type ResultItemProps = {
  id: number;
  title: string;
  cover_image: string;
  year: string;
  type: string;
};

export const ResultItem: React.FC<ResultItemProps> = ({
  id,
  title,
  cover_image: image,
  year,
  type,
}) => {
  return (
    <li className="result" key={id}>
      <img src={image} alt="cover-image" className="result_image" />
      <div className="result-info">
        <span className="result-info__title text-bold">{title}</span>
        <span className="result-info__year">{year}</span>
        <span className="result-info__type">{type}</span>
      </div>
    </li>
  );
};
