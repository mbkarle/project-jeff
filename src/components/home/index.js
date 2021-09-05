import React from "react";
import Hero, { HERO_DATA } from "components/home/hero";

const Home = () => {
  return (
    <>
      <Hero {...HERO_DATA} />
    </>
  );
};

export default Home;
