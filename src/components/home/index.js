import React from "react";
import Hero, { HERO_DATA } from "components/home/hero";
import Work, { WORK_DATA } from "components/home/work";

const Home = () => {
  return (
    <>
      <Hero {...HERO_DATA} />
      <Work {...WORK_DATA} />
    </>
  );
};

export default Home;
