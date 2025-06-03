import { Col, Container, Row } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import videohomepage from "../../assets/homepage.mp4";

const HomePage = (props) => {
  return (
    <Container className="homepage-container mt-3">
      <Row className="">
        <Col
          xs={{ span: 12, order: 2 }}
          sm={{ span: 12, order: 2 }}
          md={{ span: 12, order: 2 }}
          lg={{ span: 6, order: 1 }}
          className="homepage-video"
        >
          <div>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
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
          lg={{ span: 6, order: 2 }}
          className="homepage-content d-flex flex-column align-items-center my-5  "
        >
          <div className="homepage-content-all text-center text-md-start ps-5 py-3">
            <div className="homepage-title text-start w-100 ">
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>
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
                  "Your brain vs. the quiz!",
                  1500,
                ]}
                speed={50}
                style={{
                  fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
                  color: "#ff49c1",
                  fontWeight: "500",
                }}
                repeat={Infinity}
              />
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <h2
                  className="mt-3"
                  style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)" }}
                >
                  Ready to take the challenge?
                </h2>
              </Col>
            </div>
            <div className="homepage-text text-start my-5">
              <Col xs={12} sm={12} md={8} lg={10} xl={9}>
                <p style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}>
                  Create questions and tests quickly with smart solutions.
                  <strong> MQ </strong>
                  leverages the power of technology to enhance your learning
                  experience.
                </p>
              </Col>
            </div>
            <div className="btn-homepage text-start ">
              <Col xs={12} sm={6} md={4} lg={6} xl={5}>
                <button className="btn-get-started w-100 ">
                  Get-started - It's free
                </button>
              </Col>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
