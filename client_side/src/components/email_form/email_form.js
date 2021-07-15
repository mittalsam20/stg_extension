import "./email_form.css";
// import { EmailApi } from "../../newapi";
import axios from "axios";
import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import AlertContext from "../../pages/alertcontext";
var reg = {
  emailId: "",
};
const EmailForm = () => {
  const [InputEmail, setInputEmail] = useState("");
  const [alcont, setAlcont] = useState({
    open: false,
    message: "",
    type: "",
    dur: 1,
  });

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
      setAlcont({
        open: true,
        message: "Extension Downloaded..!!",
        type: "success",
        dur: 4000,
      });
      axios.post("/app/email", reg).then((res) => console.log(res.data));
      // console.log(data.sanitized_email);
      saveAs(
        " https://storage.googleapis.com/gmr-extension/google-meet-record-chrome-extension.zip",
        "Script_To_Growth_chrome_extension"
      );
      setInputEmail("");
      // console.log(validator);
    } else {
      setAlcont({
        open: true,
        message: "Please Use A Valid Email.!!",
        type: "error",
        dur: 4000,
      });
      console.log("set 0");
      setInputEmail("");

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
    setAlcont({ ...alcont, open: false });
  }

  useEffect(() => {}, [alcont]);
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
            <button className="diffbutton" onClick={handleClick}>
              {" "}
              Download{" "}
            </button>
          </form>
          <p>Enter Your Email To Download The Extension</p>
          {
            <AlertContext
              open={alcont.open}
              message={alcont.message}
              type={alcont.type}
              setOpen={setAlcont}
              dur={4000}
            />
          }
        </div>
      </div>
    </>
  );
};
export { reg };
export default EmailForm;
