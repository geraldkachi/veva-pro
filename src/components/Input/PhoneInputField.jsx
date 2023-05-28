import PhoneInput from "react-phone-input-2";
import InputErrorMsg from "./InputErrorMsg";
import "react-phone-input-2/lib/style.css";
import "./style.scss";
import {Controller, useFormContext} from "react-hook-form";

const PhoneInputField = ({
  id,
  name,
  errMsg,
  className,
  label,
  required = true,
}) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <div className={`form-group ${className}`}>
      {label && <label htmlFor={id || name}>{label}</label>}

      <Controller
        control={control}
        name={name}
        rules={{required: required ? errMsg : false}}
        render={({field: {onChange, value, ref}}) => (
          <div className={`input-icon-wrap`}>
            <PhoneInput
              country={"us"}
              value={value}
              onChange={phone => {
                onChange("+" + phone);
              }}
            />
          </div>
        )}
      />
      {errors[name] && <InputErrorMsg errMsg={errors[name].message} />}
    </div>
  );
};

export default PhoneInputField;
