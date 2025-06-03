import { Col, Container, Row } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import videohomepage from "../../assets/homepage.mp4";

const HomePage = (props) => {
  return (
    <Container className="homepage-container">
      <Row className="mt-3">
        <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }}>
          <div className="video-homepage">
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
          md={{ span: 6, order: 2 }}
          className="d-flex align-items-center justify-content-center "
        >
          <div className="info-homepage text-center w-100 ">
            <p className="fw-normal fs-1 ">Challenge your mind!</p>
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
                fontSize: "2em",
                color: "#ff49c1",
                fontWeight: "500",
              }}
              repeat={Infinity}
            />
            <p
              className="fw-normal fs-1 mt-3"
              style={{ marginTop: "20px", color: "#333" }}
            >
              Ready to take the challenge?
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
