import "./reset.css";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

import axios from "axios";
const ResetPass = ({ user }) => {
  const [oldPass, setOldpass] = useState("");
  const [newPass, setNewpass] = useState("");
  const [newcPass, setNewcpass] = useState("");

  return (
    <>
      <div>
        <h1>Reset Password</h1>
        <div class="resetcont">
          <div id="resetform">
            <form>
              <input
                type="password"
                placeholder="Old Password"
                name="oldpass"
                value={oldPass}
                onChange={(e) => {
                  setOldpass(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="New Password"
                name="newpass"
                value={newPass}
                onChange={(e) => {
                  setNewpass(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                name="newcpass"
                value={newcPass}
                onChange={(e) => {
                  setNewcpass(e.target.value);
                }}
              />
              <Button
                type="button"
                class="btn extra"
                onClick={async (e) => {
                  e.preventDefault();
                  const salt = await bcrypt.genSalt(10);
                  console.log(oldPass);
                  const hashedoldPass = await bcrypt.hash(oldPass, salt);
                  console.log(hashedoldPass);
                  console.log(user.password);
                  const userLogPass = await bcrypt.compare(
                    oldPass,
                    user.password
                  );
                  console.log(userLogPass);
                  //   if (oldPass === user.password) {
                  if (userLogPass) {
                    if (newPass === newcPass) {
                      const salt = await bcrypt.genSalt(10);
                      const hashednewpass = await bcrypt.hash(newPass, salt);
                      var data = JSON.stringify({
                        password: hashednewpass,
                      });

                      var config = {
                        method: "patch",
                        url: `http://localhost:5000/app/resetpass/${user._id}`,
                        headers: {
                          "Content-Type": "application/json",
                        },
                        data: data,
                      };

                      axios(config)
                        .then(function (response) {
                          console.log(JSON.stringify(response.data));
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    } else {
                      console.log("Password Are Not Matching..!");
                    }
                  } else {
                    console.log("Incorrect Password..!!");
                  }
                }}
              >
                Reset
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
