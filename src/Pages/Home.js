import React, { useEffect } from "react";
import Slider from "../components/Slider";
import { useState } from "react";
import image2 from "../image/image2.jpg";

const Home = () => {
  return (
    <>
      <div className="home_page">
        <Slider />
      </div>
    </>
  );
};

export default Home;
