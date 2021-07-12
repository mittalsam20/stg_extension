import "./logsign.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Car from "./car";
import { userData } from "../../context";
import AlertContext from "../alertcontext";
import { height } from "@material-ui/system";
const LogSign = () => {
  //---------------------USESTATES--------------------------
  const { rootUser, setRootUser } = useContext(userData);
  console.log("inside login page", rootUser);

  const history = useHistory();
  // const callMainPage = async () => {
  //   try {
  //     const res = await axios.get("/app/main", {
  //       withCredentials: true,
  //     });
  //     const userdata = await res.data;
  //     setRootUser(userdata);
  //     console.log("Root User", rootUser);
  //     // setUser(userdata);
  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(
  //       "Authentication Error..!! Please Login With Correct Credentials..!! ",
  //       err
  //     );
  //     history.push("/");
  //   }
  // };

  // useEffect(() => {
  //   callMainPage();
  // }, []);

  //   const [validator, setValidator] = useState();

  const [InputEmail, setInputEmail] = useState("");
  const [InputPass, setInputPass] = useState("");
  const [InputConfirmPass, setInputConfirmPass] = useState("");
  const [fullName, setFullName] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPass, setLogPass] = useState("");
  const [alboxcont, setAlboxcont] = useState({
    open: false,
    message: "",
    type: "",
    dur: 5000,
  });

  const callSignPage = async () => {
    try {
      const res = await axios.get("/app/main", {
        withCredentials: true,
      });
      const userdata = await res.data;
      setRootUser(userdata);
      console.log("LOGIN KE ANDAR", rootUser);
      if (userdata) {
        console.log("userdata is there..!!");
        history.push("/home");
      }

      // else {
      // }
    } catch (err) {
      console.log("error i am finding", err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callSignPage();
  }, []);

  // -----------------------EMAIL VALIDATION------------------------

  const EmailApi = async (Email) => {
    const res = await axios.post(`/app/selfproxy/${Email}`);
    // console.log("ressssss", res.data);
    // console.log("status", res.status);
    const data = await res.data;
    // console.log("parser", data.message);
    if (data.message === "Email is Correct") {
      return 1;
    } else {
      setAlboxcont({
        open: true,
        message: "Please Use a Valid Email..!!",
        type: "error",
        dur: 5000,
      });
      return 0;
    }
  };

  // -----------------------PASSWORD CHECKER------------------------

  const passwordChecker = (a, b) => {
    if (a === "" || b === "" || a === " " || b === " ") {
      setAlboxcont({
        open: true,
        message: "Please Fill All The Details..!!",
        type: "error",
        dur: 2000,
      });
    }
    if (a === b && a !== "") {
      console.log("matched");
      setAlboxcont({
        open: true,
        message: "Password's are matching..!!",
        type: "success",
        dur: 1000,
      });
      if (a.length < 8) {
        console.log("sss", a.length);
        setAlboxcont({
          open: true,
          message: "Minimum Password length is 8 Charaters",
          type: "error",
          dur: 4000,
        });
      }
      return 1;
    } else if (a !== "") {
      console.log("not matched");
      setAlboxcont({
        open: true,
        message: "Password's are not matching..!!",
        type: "error",
        dur: 20000,
      });
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

  // useEffect(() => {}, [alboxcont.message, alboxcont.open, alboxcont.type]);

  return (
    <>
      <div className="main-container">
        <div id="sign-up" className="left-container sign-up ">
          {
            <AlertContext
              open={alboxcont.open}
              message={alboxcont.message}
              type={alboxcont.type}
              setOpen={setAlboxcont}
              dur={alboxcont.dur}
            />
          }
          <h2>Script To Growth</h2>
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
              <label className="tab login_tab" for="login">
                Login
              </label>
              <label className="tab signup_tab" for="signup">
                Signup
              </label>
              <span className="shape"> </span>
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
                            // callSignPage();
                            history.push("/home");
                            setAlboxcont({
                              open: true,
                              message: res.data.message,
                              type: "success",
                              dur: 6000,
                            });
                          }
                          setAlboxcont({
                            open: true,
                            message: res.data.message,
                            type: "error",
                            dur: 6000,
                          });
                        })
                        .catch((err) => {
                          console.log(
                            "okokokokok",
                            err.message,
                            err.response.data.message,
                            "dsdsds",
                            err.request
                          );

                          setAlboxcont({
                            open: true,
                            message: err.response.data.message,
                            type: "error",
                            dur: 6000,
                          });
                        });
                    }}
                  />
                  <div className="not_mem"></div>
                </div>
                <div className="form_fild signup_form">
                  <div className="input_group">
                    <input
                      onChange={(ev) => {
                        setFullName(ev.target.value);
                      }}
                      value={fullName}
                      type="text"
                      className="input"
                      placeholder="Full Name"
                    />
                  </div>
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
                  </div>
                  <div className="input_group">
                    <input
                      value={InputPass}
                      onChange={(ev) => {
                        setInputPass(ev.target.value);
                        passwordChecker(InputPass, ev.target.value);
                      }}
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                  </div>

                  <div className="input_group">
                    <input
                      value={InputConfirmPass}
                      onChange={(ev) => {
                        setInputConfirmPass(ev.target.value);
                        passwordChecker(InputPass, ev.target.value);
                      }}
                      type="password"
                      className="input"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn"
                    value="Signup"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("clicked");
                      if (
                        EmailApi(InputEmail) &&
                        passwordChecker(InputPass, InputConfirmPass)
                      ) {
                        const reg = {
                          emailId: InputEmail,
                          password: InputPass,
                          fullName: fullName,
                        };
                        console.log(reg);
                        axios
                          .post("/app/signup", reg)
                          .then((res) => {
                            console.log(
                              "seeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                              res.status,
                              res.data,
                              // JSON.parse(res.data)
                              res.data.message
                            );
                            if (res.status !== 200) {
                              var temptype = "error";
                            }
                            setAlboxcont({
                              open: true,
                              message: res.data.message,
                              type: temptype || "success",
                              dur: 6000,
                            });
                            if (res.status === 200) {
                              setInputEmail("");
                              setInputPass("");
                              setFullName("");
                              setInputConfirmPass("");
                            }
                          })
                          .catch((err) => {
                            console.log(
                              "okokokokok",
                              err.message,
                              err.response.data.message,
                              "dsdsds",
                              err.request
                            );
                            if (err.status !== 200) {
                              var temptype = "error";
                            }
                            setAlboxcont({
                              open: true,
                              message: err.response.data.message,
                              type: temptype || "success",
                              dur: 6000,
                            });
                          });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="right-container">
          <Car className="right-in" />
        </div>
      </div>
    </>
  );
};

export default LogSign;
