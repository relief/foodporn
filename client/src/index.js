import React from "react";
import ReactDOM from "react-dom";
import Swiper from "./Swiper";
import "./stylesheets/index.css";
import "../semantic/dist/semantic.min.css";

ReactDOM.render(
  <Swiper filter={0} />,
  document.getElementById("root") // eslint-disable-line no-undef
);
