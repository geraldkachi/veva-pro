import React from "react";
import { Container, Row, Col, NavLink } from "react-bootstrap";
import Favicon from "../../assets/icons/breakfast.svg";
// import iOS from "../../assets/icons/company.svg";
// import Android from "../../assets/icons/playstore?.svg";
import "./index.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="va-bg-secondary footer" id="footer">
      <Container>
        <Row className="content">
          <Col>
            <div className="d-flex align-items-center">
              <img src={Favicon} alt="Favicon" height={48} />
              <p className="mb-0 text-white font-weight-bold ml-2 ">Veva</p>
            </div>
            <p className="mb-0 text-small va-text-secondary2 mt-4 vevas">
              Curating amazing food and restaurant experiences.
            </p>
          </Col>
          <Col>
            <p className="mb-0 text-white">Address</p>
            <p className="mb-0 mt-5 va-text-secondary2 text-small vevas">
              10 Hughes str, Alagomeji yaba Lagos
            </p>
          </Col>
          <Col>
            <p className="mb-0 text-white">Contact</p>
            <p className="mb-0 va-text-secondary2 text-small mt-5 vevas">
              +234 902 034 0385
            </p>
            <NavLink className="mb-0 va-text-secondary2 text-small pl-0 p-0 vevas">
              veva@techatpurplegate.com
            </NavLink>

            <div className="d-flex va-text-primary icono">
              <a
                href="https://instagram.com/withveva?igshid=NmZiMzY2Mjc="
                className="va-text-primary text-smaller"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/withveva/"
                className="va-text-primary text-smaller"
              >
                <LinkedInIcon />
              </a>
            </div>
          </Col>
          <Col>
            <p className="mb-0 text-white">Download Veva app</p>
            <div className="d-flex mt-5">
              <p className="mb-0 text-white">Coming soon</p>
              {/* <div className='app-wrapper'>
								<img src={iOS} alt='iOS' height={28} />
							</div>
							<div className='app-wrapper ml-4'>
								<img src={Android} alt='iOS' height={28} />
							</div> */}
            </div>
          </Col>
        </Row>
        <p className="copyright text-small">
          ⓒ Veva {new Date().getFullYear()}
        </p>
      </Container>
    </footer>
  );
}
