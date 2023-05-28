import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeadingWithShadow from "../../../../components/HeadingWithShadow";
import "./index.scss";

export default function SpecialEventsOcassion() {
  return (
    <div className="position-relative special-events">
      <div className="overlay position-absolute h-100"></div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <HeadingWithShadow
              mainText="Special events and occasions."
              shadowText="Special events and occasions."
              size={3.6}
              textClassNames="text-left text-white"
            />

            <p className="text-white  position-relative font-weight-light mt-5 w-80">
              Our Special event and occasion feature is coming soon to your city
            </p>

            <div
              className="d-flex align-items-center"
              style={{ marginTop: "5rem" }}
            >
              <h3 className="text-larger  position-relative text-white">
                Coming Soon
              </h3>
              <span
                className="h-divider-primary position-relative d-inline-block"
                style={{ marginLeft: "2rem", width: "4rem" }}
              ></span>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="thumbnail position-absolute w-50"></div>
    </div>
  );
}
