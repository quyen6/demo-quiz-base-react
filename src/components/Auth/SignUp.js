import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { postSignUp } from "../../services/apiServices";
import _ from "lodash";
import Language from "../Header/Language";
import { Container } from "react-bootstrap";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState("password");

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

  const handleToggle = () => {
    if (type === "password") {
      setShowPassword(true);
      setType("text");
    } else {
      setShowPassword(false);
      setType("password");
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }
    //validate
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    if (!isValidEmail) {
      toast.error("Invalid Email ");
    }
    if (!isValidPassword) {
      toast.error("Invalid Password ");
      return;
    }

    //submit sign up
    let data = await postSignUp(email, password, username);
    console.log("🚀 ~ handleLogin ~ data:", data);
    if (data && +data.EC === 0) {
      //EC : error code
      toast.success(data.EM); //EM: error message
      const delayedNavigate = _.debounce(() => {
        navigate("/login");
      }, 1000);

      delayedNavigate();
      setEmail("");
      setPassword("");
      setUsername("");
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <Container>
      <div className="signup-container">
        <div className="header col-12 d-flex justify-content-end align-items-center">
          <span>Already have an account yet?</span>&nbsp;
          <button
            className="btn-signup mx-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </button>
          <Language />
        </div>
        <div className="content col-xl-4 col-lg-4 col-md-6 col-sm-10 col-10 mx-auto mt-5">
          <div className="content-welcome">Let's create your account</div>
          <div className="content-form">
            <form
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   if (e.target.checkValidity()) {
            //     handleSignUp(); // xử lý khi hợp lệ
            //   } else {
            //     e.target.reportValidity(); // hiện lỗi cho người dùng
            //   }
            // }}
            >
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="password-input ">
                  <input
                    type={type}
                    className="form-control password-input "
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <i>
                    {" "}
                    <FontAwesomeIcon
                      icon={showPassword && showPassword ? faEye : faEyeSlash}
                      onClick={() => handleToggle()}
                    />
                  </i>
                </div>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn-signup col-12"
                onClick={(e) => handleSignUp(e)}
              >
                Create my free account
              </button>
            </form>
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

export default SignUp;
