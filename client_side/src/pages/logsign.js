import "./logsign.scss";
// import { useState } from "react";
// import $ from "jquery";

const LogSign = () => {
  return (
    <>
      <div>
        <section className="main">
          <div className="form_wrapper">
            <input
              type="radio"
              className="radio"
              name="radio"
              id="login"
              checked
            />
            <input type="radio" className="radio" name="radio" id="signup" />
            <div className="tile">
              <h3 className="login">Login Form</h3>
              <h3 className="signup">Signup Form</h3>
            </div>
            <label className="tab login_tab" for="login">
              Login
            </label>
            <label className="tab signup_tab" for="signup">
              Signup
            </label>
            <span className="shape"></span>
            <div className="form_wrap">
              <div className="form_fild login_form">
                <div className="input_group">
                  <input
                    type="email"
                    className="input"
                    placeholder="Email Address"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                </div>

                <a href="#forgot" className="forgot">
                  Forgot password?
                </a>

                <input type="submit" className="btn" value="Login" />

                <div className="not_mem">
                  <label for="signup">
                    Not a member? <span> Signup now</span>
                  </label>
                </div>
              </div>

              <div className="form_fild signup_form">
                <div className="input_group">
                  <input
                    type="email"
                    className="input"
                    placeholder="Email Address"
                  />
                </div>
                <div className="input_group">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                </div>

                <div className="input_group">
                  <input
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                  />
                </div>
                <input type="submit" className="btn" value="Signup" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LogSign;
