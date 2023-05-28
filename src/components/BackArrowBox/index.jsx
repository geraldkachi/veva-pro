import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./style.scss";
import { useNavigate } from "react-router-dom";
const BackArrowBox = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(-1);
      }}
      className="back_arrow_box"
    >
      <div className="cover_icon">
        <ArrowBackIcon />
      </div>
      {children}
    </div>
  );
};

export default BackArrowBox;
