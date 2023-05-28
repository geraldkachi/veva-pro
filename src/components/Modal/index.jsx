import { Fade, IconButton, Slide } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./style.scss";
import logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";
const Modal = ({
  children,
  closeModal,
  openModal = true,
  title,
  noCancel = false,
}) => {
  return (
    <Fade in={openModal}>
      <div
        onClick={(e) => e.target === e.currentTarget && closeModal()}
        className="pd-modal"
      >
        <Slide direction="top" in={openModal} mountOnEnter unmountOnExit>
          <div className="popBox">
            <div className="top_side">
              <Link to={"/"} className="img_cover">
                <img src={logo} alt="logo" className="logo" />
                <p>Veva</p>
              </Link>

              {title && (
                <div className="title_cover">
                  <p className="title">{title}</p>
                </div>
              )}
              <CloseIcon onClick={closeModal} />
            </div>
            <div className="modal_cover">{children}</div>
          </div>
        </Slide>
      </div>
    </Fade>
  );
};

export default Modal;
