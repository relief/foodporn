import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WechatApp from "./WechatApp";
import Swiper from "./Swiper";
import "./stylesheets/index.css";
import "../semantic/dist/semantic.min.css";

ReactDOM.render(
  <Swiper filter={2} />,
  document.getElementById("root") // eslint-disable-line no-undef
);
