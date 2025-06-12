import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // validate

    //submit login
    let data = await postLogin(email, password);

    if (data && +data.EC === 0) {
      dispatch(doLogin(data));
      //EC : error code
      toast.success(data.EM); //EM: error message
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <div className="login-container">
      <div className="header col-12 d-flex justify-content-end align-items-center">
        <span>Don't have an account yet?</span>&nbsp;
        <button
          className="btn-signup"
          onClick={() => {
            navigate("/sign_up");
          }}
        >
          Sign Up
        </button>
      </div>
      <div className="content col-4 mx-auto mt-5">
        <div className="content-title">Quinn_MQ</div>

        <div className="content-welcome">Hello, who's this?</div>
        <div className="content-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password">Forgot password ?</div>
          <button className="btn-login col-12" onClick={() => handleLogin()}>
            Login
          </button>
          <div
            className="back text-center"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            &lt; Go to HomePage
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
