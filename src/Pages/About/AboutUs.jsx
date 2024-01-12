import React from "react";
import Introduction from "../About/Introduction";
import LinhPic from "./Linh.jpeg";
import NganPic from "./Ngan.jpg";
import NickPic from "./Nick.jpg";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Import the ScrollLink component
import { animateScroll as scroll } from "react-scroll"; // Import the scroll function for smooth scrolling

const About = () => {
  const scrollToGraph = () => {
    // Use the scroll function to scroll to the team details section
    scroll.scrollTo("graph-section", {
      duration: 800, // Scroll duration in milliseconds
      smooth: "easeInOutQuart", // Scroll animation type
    });
  };

  return (
    <>
      <Introduction/>
        <div id="graph-section" className="hero h-screen 2xl:h-700  shadow-xl rounded-xl mt-10 my-10 flex flex-col justify-between overflow-y-auto">
          {/* Linh's information */}
          <div className="hero-content flex-col lg:flex-row items-center"> {/* add mb */}
            <img
              src={LinhPic}
              className="scale-55 rounded-full 2xl:scale-150 max-w-sm 2xl:mr-16 mb-4 lg:mb-0"
            />
            <div className="mr-1 xl:ml-10">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                  Linh Le
                </h1>
                <p className="py-6 text-xl text-white">
                  Student ID: 104079570
                  <br />
                  Course: Bachelor of Computer Science
                </p>
                <a href="mailto:104079570@student.swin.edu.au" class="btn btn-primary">Contact</a>
            </div>
          </div>
          {/* Ngan's information */}
          <div className="hero-content flex-col lg:flex-row-reverse items-center">
            <img
              src={NganPic}
              className="scale-55 rounded-full 2xl:scale-150 max-w-sm 2xl:ml-16 mb-4 lg:mb-0"
            />
            <div className="mr-1 xl:mr-10">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                  Thao Ngo
                </h1>
                <p className="py-6 text-xl text-white">
                  Student ID: 104055130
                  <br />
                  Course: Bachelor of Computer Science
                </p>
                <a href="mailto:104055130@student.swin.edu.au" class="btn btn-primary">Contact</a>
            </div>
          </div>
          {/* Nick's information */}
          <div className="hero-content flex-col lg:flex-row items-center">
            <img
              src={NickPic}
              className="scale-55 rounded-full 2xl:scale-150 max-w-sm 2xl:mr-16 mb-4 lg:mb-0"
            />
            <div className="mr-1 xl:ml-10">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                  Nick Bui
                </h1>
                <p className="py-6 text-xl text-white">
                  Student ID: 100575870
                  <br />
                  Course: Bachelor of Computer Science
                </p>
                <a href="mailto:100575870@student.swin.edu.au" class="btn btn-primary">Contact</a>
            </div>
          </div>
        </div>
      </>
  );
};
export default About;
