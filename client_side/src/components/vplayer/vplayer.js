import ReactPlayer from "react-player";
import axios from "axios";
import { useState, useEffect } from "react";
const Vplayer = () => {
  const [currentUrl, setcurrentUrl] = useState("");
  const retUrl = async () => {
    const res = await axios.get("http://localhost:5000/app/getrecurl");
    const data = await res.data;
    console.log(data);
    console.log(data[1].recordingUrl);
    setcurrentUrl(data[1].recordingUrl);
  };
  // useEffect(() => {
  //   if (validator === 0) {
  //     setError("Please Use a Valid Email-Id");
  //   }
  // }, [currentUrl]);
  return (
    <div>
      <div className="player-wrapper">
        <ReactPlayer controls width="100%" height="100%" url={currentUrl} />
      </div>
      <button
        onClick={() => {
          console.log("clicked");
          retUrl();
        }}
      >
        hello
      </button>
    </div>
  );
};

export default Vplayer;
