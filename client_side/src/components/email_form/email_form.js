import "./email_form.css";
// import { EmailApi } from "../../newapi";
import axios from "axios";
import { useState, useEffect } from "react";

var reg = {
  emailId: "",
};
const EmailForm = () => {
  const [InputEmail, setInputEmail] = useState("");
  const [validator, setValidator] = useState(2);
  const [EmailChecker, setemailChecker] = useState(
    "Please Enter Your Email To Download The Extension"
  );

  const EmailApi = async (Email) => {
    // const Key = "ji5gzJYlaRp86krIbRJsRcOHBxnaLzMc";
    // const url = `https://ipqualityscore.com/api/json/email/${Key}/${Email}`;
    // const url = `/api/json/email/${Key}/${Email}`;
    const res = await axios.post(`/app/selfproxy/${Email}`);
    console.log("ressssss", res.data);
    // console.log("status", res.status);
    const data = await res.data;
    console.log("parser", data.message);
    if (data.message === "Email is Correct") {
      console.log(Email);
      reg.emailId = Email;
      setValidator(1);
      axios.post("/app/email", reg).then((res) => console.log(res.data));
      // console.log(data.sanitized_email);
      setInputEmail("");
      // console.log(validator);
    } else {
      setValidator(0);
      console.log("set 0");
      // console.log("Please Enter An Valid Email..!!");
      // console.log(validator);
    }
  };

  function handleEmail(ev) {
    // console.log(ev.target.value);
    setInputEmail(ev.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    EmailApi(InputEmail);
  }

  useEffect(() => {
    // console.log(validator);
    if (validator === 1) {
      setemailChecker("Started Downloading..!");
    } else if (validator === 0) {
      setemailChecker("Please use a valid Email-Id");
    } else {
      setemailChecker("Enter Your Email To Download The Extension");
    }
  }, [validator]);
  // const getid = () => {
  //   return reg.emailId;
  // };
  return (
    <>
      <div className="EmailFormDiv">
        <h2> You Are One Step Away From By - Hearting Your Meetings..!! </h2>
        <div className="innerEmailDiv">
          <form action="" method="" id="emailform">
            <input
              onChange={handleEmail}
              type="email"
              name="emailEntry"
              placeHolder="Email"
              value={InputEmail}
            />
            <button onClick={handleClick}> Download </button>
          </form>
          <p> {EmailChecker} </p>
        </div>
      </div>
    </>
  );
};
export { reg };
export default EmailForm;
