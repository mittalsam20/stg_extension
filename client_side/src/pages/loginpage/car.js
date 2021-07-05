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
        interval={1000}
        bullets={false}
        infinite={true}
        className="car-contain"
      >
        <div className=" first">1</div>
        <div className=" sec">2</div>
        <div className=" third">3</div>
        <div className=" fourth">4</div>
        <div className=" fifth">5</div>
      </AutoplaySlider>
    </>
  );
};

export default Car;
