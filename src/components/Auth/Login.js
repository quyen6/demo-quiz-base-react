import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import Language from "../Header/Language";
import { Container } from "react-bootstrap";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (password) => {
    return (
      // /[A-Z]/.test(password) &&
      // /[a-z]/.test(password) &&
      // /[0-9]/.test(password) &&
      // /[^A-Za-z0-9]/.test(password) &&
      password.length > 4
    );
  };

  const handleLogin = async () => {
    // validate
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    if (!isValidEmail) {
      toast.error("Invalid Email ");
    }
    if (!isValidPassword) {
      toast.error("Invalid Password ");
      return;
    }

    setLoading(true);

    //submit login
    let data = await postLogin(email, password);

    if (data && +data.EC === 0) {
      dispatch(doLogin(data));
      //EC : error code
      toast.success(data.EM); //EM: error message

      setLoading(false);
      navigate("/");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e && e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <Container>
      <div className="login-container">
        <div className="header col-12 d-flex justify-content-end align-items-center">
          <span>Don't have an account yet?</span>&nbsp;
          <button
            className="btn-signup mx-2"
            onClick={() => {
              navigate("/sign_up");
            }}
          >
            Sign Up
          </button>
          <Language />
        </div>
        <div className="content col-xl-4 col-lg-4 col-md-6 col-sm-10 col-10 mx-auto mt-5">
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
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>
            <div className="forgot-password">Forgot password ?</div>
            <button
              className="btn-login col-12"
              onClick={() => handleLogin()}
              disabled={loading}
            >
              {loading && <FontAwesomeIcon icon={faSync} spin />} Login
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
    </Container>
  );
};

export default Login;
