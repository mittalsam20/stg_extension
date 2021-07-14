import "./reset.css";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
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
                  const hashedoldPass = "hello";
                  if (hashedoldPass === user.password) {
                    if (newPass === newcPass) {
                      axios.patch("/resetpassword/:id").then().catch();
                    } else {
                      console.log("Password Are Not Matching..!");
                    }
                  } else {
                    console.log("wrong old password");
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
