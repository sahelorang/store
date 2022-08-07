import React from "react";
import { Link } from "react-router-dom";
import classes from "./Slide.module.css";

const Slide = ({item:{title,image,desc},transform=0}) => {
  return (
    <div className={classes.slide} style={{transform: `translateX(${transform*100}%)`}} >
      <div className={classes["img-container"]}>
        <img
          className={classes.image}
          alt="product name"
          src={image}
        />
      </div>
      <div className={classes.info}>
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.desc}>{desc}</p>
        <Link to='/products' className={classes.btn}>Discover More</Link>
      </div>
    </div>
  );
};

export default Slide;
