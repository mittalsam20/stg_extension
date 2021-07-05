import "./logsign.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Car from "./car";

const LogSign = () => {
  //---------------------USESTATES--------------------------
  const history = useHistory();
  //   const [validator, setValidator] = useState();
  const [InputEmail, setInputEmail] = useState("");
  const [InputPass, setInputPass] = useState("");
  const [InputConfirmPass, setInputConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPass, setLogPass] = useState("");

  const callSignPage = async () => {
    try {
      const res = await axios.get("/app/main", {
        withCredentials: true,
      });
      const userdata = await res.data;
      if (userdata) {
        history.push("/home");
      } else {
      }
    } catch (err) {
      console.log("error i am finding", err);
      history.push("/");
    }
  };

  useEffect(() => {
    callSignPage();
  }, []);

  // -----------------------EMAIL VALIDATION------------------------

  //   const EmailApi = async (Email, pass) => {
  //     const Key = "ji5gzJYlaRp86krIbRJsRcOHBxnaLzMc";
  //     // const url = `https://ipqualityscore.com/api/json/email/${Key}/${Email}`;
  //     const url = `/api/json/email/${Key}/${Email}`;
  //     const res = await axios.get(url);
  //     const data = await res.data;
  //     // console.log(data);
  //     if (
  //       data.valid &&
  //       data.overall_score > 2 &&
  //       data.smtp_score > 1 &&
  //       !data.disposable &&
  //       data.dns_valid &&
  //       !data.honeypot
  //     ) {
  //       console.log(Email);

  //       setValidator(1);
  //       console.log(data.sanitized_email);
  //       // console.log(validator);
  //     } else {
  //       setValidator(0);
  //       // console.log("Please Enter An Valid Email..!!");
  //       // console.log(validator);
  //     }
  //   };
  // -----------------------PASSWORD CHECKER------------------------

  const passwordChecker = (a, b) => {
    if (a === b) {
      console.log("matched");
      setError("");
      return 1;
    } else {
      console.log("not matched");
      setError("Password Not Matched..!!");
      return 0;
    }
  };

  //   useEffect(() => {
  //     // console.log(validator);
  //     if (validator === 0) {
  //       setError("Please Use a Valid Email-Id");
  //     }
  //   }, [validator]);

  //----------------------------------RETURN FUNCTION---------------------------------------

  return (
    <>
      <div className="main-container">
        <div id="sign-up" className="left-container sign-up ">
          <section className="main">
            <div className="form_wrapper">
              <input
                type="radio"
                className="radio"
                name="radio"
                id="login"
                defaultChecked
              />
              <input type="radio" className="radio" name="radio" id="signup" />
              <div className="tile">
                <h3 className="login"> Login Form </h3>{" "}
                <h3 className="signup"> Signup Form </h3>{" "}
              </div>{" "}
              <label className="tab login_tab" for="login">
                Login{" "}
              </label>{" "}
              <label className="tab signup_tab" for="signup">
                Signup{" "}
              </label>{" "}
              <span className="shape"> </span>{" "}
              <div className="form_wrap">
                <div className="form_fild login_form">
                  <div className="input_group">
                    <input
                      onChange={(ev) => {
                        setLogEmail(ev.target.value);
                      }}
                      value={logEmail}
                      type="email"
                      className="input"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="input_group">
                    <input
                      onChange={(ev) => {
                        setLogPass(ev.target.value);
                      }}
                      value={logPass}
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                  </div>
                  <a href="gmail.com" className="forgot">
                    Forgot password ?
                  </a>
                  <input
                    type="submit"
                    className="btn"
                    value="Login"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("login clicked");
                      // EmailApi(InputEmail, InputPass);
                      const loginreg = {
                        logEmail: logEmail,
                        logPass: logPass,
                      };
                      console.log(loginreg);
                      axios
                        .post("/app/login", loginreg, {
                          withCredentials: true,
                        })
                        .then((res) => {
                          console.log("sam var", res.data);
                          if (res.status === 200) {
                            history.push("/home");
                          }
                        });
                    }}
                  />
                  {/* Login
                </input> */}
                  <div className="not_mem">
                    <label for="signup">
                      Not a member ? <span> Signup now </span>{" "}
                    </label>{" "}
                  </div>{" "}
                </div>
                <div className="form_fild signup_form">
                  <div className="input_group">
                    <input
                      onChange={(ev) => {
                        setInputEmail(ev.target.value);
                      }}
                      value={InputEmail}
                      type="email"
                      className="input"
                      placeholder="Email Address"
                    />
                  </div>{" "}
                  <div className="input_group">
                    <input
                      onChange={(ev) => {
                        setInputPass(ev.target.value);
                        passwordChecker(InputPass, ev.target.value);
                      }}
                      type="password"
                      className="input"
                      placeholder="Password"
                      value={InputPass}
                    />{" "}
                  </div>
                  <div className="input_group">
                    <input
                      onChange={(ev) => {
                        setInputConfirmPass(ev.target.value);
                        passwordChecker(InputPass, ev.target.value);
                      }}
                      type="password"
                      className="input"
                      placeholder="Confirm Password"
                      value={InputConfirmPass}
                    />{" "}
                  </div>{" "}
                  <p> {error} </p>{" "}
                  <input
                    type="submit"
                    className="btn"
                    value="Signup"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("clicked");
                      // EmailApi(InputEmail, InputPass);
                      if (
                        //   validator === 1 &&
                        passwordChecker(InputPass, InputConfirmPass)
                      ) {
                        const reg = {
                          emailId: InputEmail,
                          password: InputPass,
                        };
                        console.log(reg);
                        axios
                          .post("/app/signup", reg)
                          .then((res) => console.log(res.data));
                      }
                    }}
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </section>{" "}
        </div>
        <div className="right-container">
          <Car className="right-in" />
        </div>
      </div>
    </>
  );
};

export default LogSign;
