import React from "react";
import PropTypes from "prop-types";
import Hero from "components/home/hero";
import Work from "components/home/work";
import ProjectArchive from "components/home/project-archive";
import Contact from "components/home/contact";

const Home = ({ data }) => {
  const { heroContent, workExamples, projectArchive, contact } = data || {};
  return (
    <>
      <Hero {...(heroContent || {})} />
      <Work examples={workExamples} />
      {projectArchive && <ProjectArchive {...projectArchive} />}
      {contact && <Contact {...contact} />}
    </>
  );
};

Home.propTypes = {
  data: PropTypes.shape({
    heroContent: PropTypes.object,
    workExamples: PropTypes.arrayOf(PropTypes.object),
    projectArchive: PropTypes.object,
  }),
};

export default Home;
