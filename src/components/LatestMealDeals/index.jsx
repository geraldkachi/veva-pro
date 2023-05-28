import React from "react";
import { Container, Row, Col, NavLink } from "react-bootstrap";
import { ArrowRightOutlined } from "@ant-design/icons";
import CardImage from "../../assets/icons/appetizer.png";
import "./index.scss";

export default function LatestMealDeals() {
  return (
    <Container className="lastest-meal-deals">
      <Row className="mt-5">
        <Col>
          <Container>
            <Row>
              {/* Column 1 */}
              <Col sm="4" className="px-0">
                <div
                  className="deal-card position-relative d-flex align-items-end justify-content-end"
                  style={{
                    backgroundImage: `url(${CardImage})`,
                  }}
                >
                  <div className="overlay h-100 w-100 position-absolute"></div>
                  <div className="big-discount position-absolute">
                    <h3>100&#37;</h3>
                    <div className="small-discount position-absolute">
                      <span>off</span>
                    </div>
                  </div>

                  <NavLink
                    className="py-4 d-flex align-items-center justify-content-center va-text-primary mb-4 mr-4"
                    style={{ zIndex: 1 }}
                  >
                    <span className="mr-4">View deals</span>
                    <ArrowRightOutlined />
                  </NavLink>
                </div>
              </Col>
              {/* Column 2 */}
              <Col className="px-0">
                <Container>
                  <Row>
                    <Col sm="5">
                      <div
                        className="deal-card position-relative d-flex align-items-end justify-content-end"
                        style={{
                          backgroundImage: `url(${CardImage})`,
                        }}
                      >
                        <div className="overlay h-100 w-100 position-absolute"></div>
                        <div className="big-discount position-absolute">
                          <h3>100&#37;</h3>
                          <div className="small-discount position-absolute">
                            <span>off</span>
                          </div>
                        </div>

                        <NavLink
                          className="py-4 d-flex align-items-center justify-content-center va-text-primary mb-4 mr-4"
                          style={{ zIndex: 1 }}
                        >
                          <span className="mr-4">View deals</span>
                          <ArrowRightOutlined />
                        </NavLink>
                      </div>
                    </Col>
                    {/* Column 3 and 4 */}
                    <Col>
                      <Container className="d-flex flex-column h-100 px-0">
                        <Row>
                          {/* Column 3 */}
                          <Col>
                            <div
                              className="deal-card position-relative d-flex align-items-end justify-content-end small"
                              style={{
                                backgroundImage: `url(${CardImage})`,
                              }}
                            >
                              <div className="overlay h-100 w-100 position-absolute"></div>
                              <div className="big-discount position-absolute small right">
                                <h3>100&#37;</h3>
                                <div className="small-discount position-absolute">
                                  <span>off</span>
                                </div>
                              </div>

                              <NavLink
                                className="py-4 d-flex align-items-center justify-content-center va-text-primary mb-4 mr-4"
                                style={{
                                  zIndex: 1,
                                }}
                              >
                                <span className="mr-4">View deals</span>
                                <ArrowRightOutlined />
                              </NavLink>
                            </div>
                          </Col>
                          {/* Column 4 */}
                          <Col>
                            <div
                              className="deal-card position-relative d-flex align-items-end justify-content-end small"
                              style={{
                                backgroundImage: `url(${CardImage})`,
                              }}
                            >
                              <div className="overlay h-100 w-100 position-absolute"></div>
                              <div className="big-discount position-absolute small right">
                                <h3>100&#37;</h3>
                                <div className="small-discount position-absolute">
                                  <span>off</span>
                                </div>
                              </div>

                              <NavLink
                                className="py-4 d-flex align-items-center justify-content-center va-text-primary mb-4 mr-4"
                                style={{
                                  zIndex: 1,
                                }}
                              >
                                <span className="mr-4">View deals</span>
                                <ArrowRightOutlined />
                              </NavLink>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mt-auto">
                          <Col>
                            <div
                              className="deal-card position-relative d-flex align-items-end justify-content-end small"
                              style={{
                                backgroundImage: `url(${CardImage})`,
                              }}
                            >
                              <div className="overlay h-100 w-100 position-absolute"></div>
                              <div className="big-discount position-absolute small left">
                                <h3>100&#37;</h3>
                                <div className="small-discount position-absolute">
                                  <span>off</span>
                                </div>
                              </div>

                              <NavLink
                                className="py-4 d-flex align-items-center justify-content-center va-text-primary mb-4 mr-4"
                                style={{
                                  zIndex: 1,
                                }}
                              >
                                <span className="mr-4">View deals</span>
                                <ArrowRightOutlined />
                              </NavLink>
                            </div>
                          </Col>
                          <Col>
                            <div
                              className="deal-card position-relative d-flex align-items-end justify-content-end small"
                              style={{
                                backgroundImage: `url(${CardImage})`,
                              }}
                            >
                              <div className="overlay h-100 w-100 position-absolute"></div>
                              <div className="big-discount position-absolute small left">
                                <h3>100&#37;</h3>
                                <div className="small-discount position-absolute">
                                  <span>off</span>
                                </div>
                              </div>

                              <NavLink
                                className="py-4 d-flex align-items-center justify-content-center va-text-primary mb-4 mr-4"
                                style={{
                                  zIndex: 1,
                                }}
                              >
                                <span className="mr-4">View deals</span>
                                <ArrowRightOutlined />
                              </NavLink>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
