import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useState } from "react";
import Slide from "./Slide";
import classes from "./Slider.module.css";
import { sliderItems } from "../../data";

const Slider = () => {
  const [slidePosition, setSlidePotision] = useState(0);

  const moveForwardSlide = () => {
    if (slidePosition >= sliderItems.length - 1) {
      setSlidePotision(0);
      return;
    }
    setSlidePotision(pos => pos + 1);
  };

  const moveBackSlide = () => {
    if (slidePosition <= 0) {
      setSlidePotision(sliderItems.length - 1);
      return;
    }
    setSlidePotision(pos => pos - 1);
  };

  return (
    <div className={classes.slider}>
      {sliderItems.map((item, i) => (
        <Slide key={i} item={item} transform={i - slidePosition} />
      ))}
      <button className={classes.btnBack} onClick={moveBackSlide}>
        <ArrowBackIos />
      </button>
      <button className={classes.btnForward} onClick={moveForwardSlide}>
        <ArrowForwardIos />
      </button>
    </div>
  );
};

export default Slider;
