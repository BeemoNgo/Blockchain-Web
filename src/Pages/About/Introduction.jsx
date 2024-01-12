import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll"; // Import the ScrollLink component
//import headerImg from "../../assets/img/header-img.svg";
import Image from "./Image.png";
//import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const About = () => {
  // State management for the text typewriter effect
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Explorer", "Investigate", "Web Services" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) }; // Cleanup: clear the interval on component unmount
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    // Switch to deleting mode once the text has fully appeared
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      // Switch to typing mode once the text has fully disappeared
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <div className="hero-content flex-col lg:flex-row">
            {/* Image component which animates in when visible */}
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""} >
                  <img className="scale-100 2xl:scale-100 max-w-sm 2xl:mr-16" src={Image} alt="Header Img"/>
                </div>}
            </TrackVisibility>

            <div className="mr-1 xl:ml-10" >
              {/* Text content which animates in when visible */}
              <TrackVisibility>
                {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>

                  <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 inline-block text-transparent bg-clip-text">
                    {`Blockchain`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Explorer", "Investigate", "To Infinity And Beyond!" ]'><span className="wrap">{text}</span></span></h1>
                    <p className="py-6 text-lg text-white">
                      Welcome to the world of Bitcoin—a decentralized
                    digital currency paving the way for the future of finance.
                    Explore, learn, and be part of the revolution that's reshaping
                    the monetary landscape.</p>
                    <ScrollLink to="graph-section" smooth={true} duration={800}>
                      <button className="btn btn-primary font-bold tracking-wider p-3 border bg-gradient-to-r from-purple-600 to-indigo-700 border-white mb-3 inline-block">Let's start!</button>
                    </ScrollLink>
                    {/* <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button> */}
                </div>}
              </TrackVisibility>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default About;
