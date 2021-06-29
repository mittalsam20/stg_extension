import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Nav from "../../components/navbar/nav";

const AccountPage = () => {
  const history = useHistory();
  const callMainPage = async () => {
    try {
      const res = await axios.get("/app/main", {
        withCredentials: true,
      });
      const userdata = await res.data;
      console.log("assemble", userdata);
      // setUser(userdata);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log("error i am finding", err);
      history.push("/");
    }
  };

  useEffect(() => {
    callMainPage();
  }, []);

  return (
    <>
      {/* <Nav /> */}
      <div>
        <h1>account page</h1>
      </div>
    </>
  );
};

export default AccountPage;
