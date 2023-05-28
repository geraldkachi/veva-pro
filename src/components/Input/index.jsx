import {useState} from "react";
import "./style.scss";
import InputErrorMsg from "./InputErrorMsg";
import {useFormContext, get} from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export const trapSpacesForRequiredFields = (value, required) => {
  if (required) {
    return !!value.trim();
  }
};

const InputField = ({
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
  validatePassword,
  extraPattern,
  extraValidation,
  showErr = true,
  rounded = true,
  ...otherProps
}) => {
  let pattern;
  switch (type) {
    case "text":
      pattern = /[a-zA-Z0-9]/;
      break;
    case "date":
      pattern = "";
      break;
    case "url":
      pattern =
        extraPattern ||
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      break;
    case "email":
      pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      break;
    default:
      pattern = "";
      break;
  }

  const [showPassword, setShowPassword] = useState(true);
  const {
    register,
    formState: {errors},
  } = useFormContext();
  const error = get(errors, name);

  let minMax = {};
  if (otherProps.min || otherProps.max) {
    minMax = {
      min: {
        value: otherProps.min,
        message: errMsg,
      },
      max: {
        value: otherProps.max,
        message: errMsg,
      },
    };
  }
  return (
    <div className={`form-group ${className}`}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <div
        className={`input-icon-wrap ${
          iconPlaceholder ? "icon-placeholder" : ""
        } ${errors[name] ? "is-invalid" : ""}  ${rounded ? "rounded" : ""}`}
      >
        {type === "password" ? (
          <>
            <input
              autoComplete="off"
              name={name}
              type={showPassword ? "password" : "text"}
              id={id}
              {...register(name, {
                required: required ? "You must specify a password" : false,
                validate: value =>
                  validatePassword ? validatePassword(value) : null,
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                ...minMax,
              })}
              {...otherProps}
              placeholder={otherProps.placeholder}
            />
            <button
              disabled={otherProps.disabled}
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
              {...otherProps}
              type={type}
              id={id || name}
              {...register(name, {
                required: required ? "This Field is required" : false,
                validate: {
                  isNotEmpty: value =>
                    trapSpacesForRequiredFields(value, required),
                  ...extraValidation,
                },
                pattern: {
                  value: pattern,
                  message: `Please enter a valid ${type} field`,
                },
                ...minMax,
              })}
              name={name}
              placeholder={otherProps.placeholder}
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

      {showErr && error && <InputErrorMsg errMsg={error.message || errMsg} />}
    </div>
  );
};

export default InputField;
