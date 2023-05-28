import "./style.scss";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
const Hamburger = ({ handleClick }) => {
  return (
    <div onClick={handleClick} className="cover_ham">
      <IconButton aria-label="delete">
        <MenuIcon />
      </IconButton>
    </div>
  );
};

export default Hamburger;
