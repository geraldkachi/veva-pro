import {useState} from "react";
import "./style.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const NormalInput = ({
  type,
  id,
  name,
  isIconDisabled = true,
  errMsg,
  iconPlaceholder,
  iconPosition = "right",
  className,
  required = true,
  label,
  rounded = true,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className={`form-group ${className}`}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <div
        className={`input-icon-wrap ${
          iconPlaceholder ? "icon-placeholder" : ""
        } ${rounded ? "rounded" : ""} `}
      >
        {type === "password" ? (
          <>
            <input
              autoComplete="off"
              name={name}
              type={showPassword ? "password" : "text"}
              id={id}
              {...props}
              placeholder={props.placeholder}
            />
            <button
              disabled={props.disabled}
              onClick={() => setShowPassword(prev => !prev)}
              type="button"
              className="icon icon-right"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </>
        ) : (
          <>
            <input
              autoComplete="off"
              {...props}
              type={type}
              id={id || name}
              name={name}
              placeholder={props.placeholder}
            />
          </>
        )}
        {iconPlaceholder && (
          <div
            disabled={isIconDisabled}
            className={`icon startIcon-${iconPosition}`}
          >
            {iconPlaceholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default NormalInput;
