import InputErrorMsg from "./InputErrorMsg";
import { useFormContext } from "react-hook-form";
import "./style.scss";
import { trapSpacesForRequiredFields } from "./index";
import { useState } from "react";

const Textbox = ({
  label,
  id,
  name,
  placeholder,
  isDisabled,
  errMsg,
  notRequired,
  maxLength,
  extraClass,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [valueLength, setvalueLength] = useState(0);
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id || name}>
          {label}
          {maxLength && (
            <span>
              {valueLength} / {maxLength}
            </span>
          )}
        </label>
      )}
      <textarea
        className={`input-icon-wrap ${errors[name] ? "is-invalid" : ""} ${
          extraClass && extraClass
        }`}
        name={name}
        id={id || name}
        {...register(name, {
          required: notRequired ? false : true,
          validate: (value) => trapSpacesForRequiredFields(value, notRequired),
          maxLength: {
            value: maxLength ? maxLength : null,
            message: "Maximum length exceeded",
          },
          onChange: (e) => setvalueLength(e.target.value.length),
        })}
        placeholder={placeholder}
        disabled={isDisabled}
      ></textarea>
      {errors[name] && (
        <InputErrorMsg errMsg={errors[name].message || errMsg} />
      )}
    </div>
  );
};

export default Textbox;
