import React from "react";
import { SearchRounded } from "@mui/icons-material";
import classes from "./Search.module.css";

const Search = ({
  placeholder = "Type for search...",
  icon = <SearchRounded fontSize="large" />,
}) => {
  return (
    <form className={classes["search"]} onSubmit={e => e.preventDefault()}>
      <button className={classes["btn"]}>{icon}</button>
      <input
        className={classes["input"]}
        placeholder={placeholder}
        onClick={e => e.preventDefault()}
      />
    </form>
  );
};

export default Search;
