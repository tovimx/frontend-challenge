import React from "react";
import "./List.scss";

export const List: React.FC<{
  children: React.ReactNode;
  className: string;
}> = ({ children, className }) => {
  return (
    <section className={className ? `${className} list` : "list"}>
      <ul className="list_group">{children}</ul>
    </section>
  );
};
