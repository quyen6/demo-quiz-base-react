import { Col, Container, Row } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import videohomepage from "../../assets/homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const HomePage = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Container className="homepage-container ">
      <Container>
        <Row className="">
          <Col
            xs={{ span: 12, order: 2 }}
            sm={{ span: 12, order: 2 }}
            md={{ span: 12, order: 2 }}
            lg={{ span: 6, order: 2 }}
            className="homepage-video"
          >
            <div>
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "95%",
                  height: "95%",
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                  objectFit: "cover",
                }}
              >
                <source src={videohomepage} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            sm={{ span: 12, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 6, order: 1 }}
            className="homepage-content d-flex flex-column align-items-center justify-content-center my-xxl-5 mb-4  "
          >
            <div className="homepage-content-all text-center text-md-start ps-xxl-5 ps-xl-4 ps-lg-4 py-xxl-4 py-xl-4 py-lg-4 ">
              <div className="homepage-title text-start w-100 ">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}>
                    Challenge your mind!
                  </h1>
                </Col>

                <TypeAnimation
                  sequence={[
                    "Think fast 🔥",
                    1500,
                    "Click smart 🧠",
                    1500,
                    "Win big 🎯",
                    1500,
                    "Your brain vs. quiz!",
                    1500,
                  ]}
                  speed={50}
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 3rem)",
                    color: "#ff49c1",
                    fontWeight: "500",
                  }}
                  repeat={Infinity}
                />
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                  <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}>
                    Are you ready ?
                  </h1>
                </Col>
              </div>
              <div className="homepage-text text-start  my-xxl-5 my-lg-4 ">
                <Col xs={12} sm={12} md={8} lg={10} xl={9}>
                  <p style={{ fontSize: "clamp(1rem, 1.15rem, 1.25rem)" }}>
                    <Trans
                      i18nKey="homepage.homepagetext"
                      components={{ strong: <strong /> }}
                    />
                  </p>
                </Col>
              </div>
              <div className="btn-homepage text-start ">
                <Col xs={12} sm={6} md={10} lg={10} xl={6}>
                  {isAuthenticated ? (
                    <button
                      className="btn-get-started w-100 "
                      onClick={() => navigate("/users")}
                    >
                      Doing Quiz Now
                    </button>
                  ) : (
                    <button
                      className="btn-get-started w-100 "
                      onClick={() => navigate("/login")}
                    >
                      Get-started - It's free
                    </button>
                  )}
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
