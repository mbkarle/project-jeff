import React from "react";
import Hero from "components/home/hero";
import Work from "components/home/work";

const Home = ({ data }) => {
  return (
    <>
      <Hero {...data.heroContent} />
      <Work examples={data.workExamples} />
    </>
  );
};

export default Home;
