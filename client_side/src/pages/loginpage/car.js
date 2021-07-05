import { Carousel } from "react-bootstrap";

import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import "./car.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);
const Car = () => {
  return (
    <>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={true} // should stop playing on user interaction
        interval={2000}
        bullets={false}
        infinite={true}
        className="car-contain"
      >
        <div className=" third">
          <h1>RECORDING AUDIO AND VIDEO</h1>
        </div>
        <div className=" fourth">
          <h1>Accurate Transcribed Notes Of the Audio In Your Hands</h1>
        </div>
        <div className=" first">
          <h1>
            INCREASE EMPLOYEE ENGAGEMENT RATE WITHOUT SPENDING AN EXTRA BUCK.
          </h1>
        </div>
        <div className=" sec">
          <h1>
            We Will Always Be There To
            <br />
            <span>Serve </span>You
          </h1>
        </div>
        <div className=" fifth">
          <h1>
            <span>GROWTH </span> THAT IS ALWAYS SOARING AND RAISING THE BAR FOR
            COMPETITORS
          </h1>
        </div>
      </AutoplaySlider>
    </>
  );
};

export default Car;
