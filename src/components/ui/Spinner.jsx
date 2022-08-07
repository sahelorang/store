import { CircularProgress } from "@mui/material";
import React from "react";
import classes from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
};

export default Spinner;
