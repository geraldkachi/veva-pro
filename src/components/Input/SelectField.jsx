import * as React from "react";
import {Controller, useFormContext, get} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {FormLabel} from "@mui/material";
import InputErrorMsg from "./InputErrorMsg";

export default function SelectField({
  name,
  className,
  required = true,
  selectOption = [],
  label,
  isLoading,
  isDisabled,
  handleCustomChange,
  placeholder,
  menuClasses,
  fetchErr,
  noOptionMsg,
}) {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const error = get(errors, name);

  return (
    <FormControl
      sx={{m: "10px 0"}}
      className={`form-group select-group ${className}`}
    >
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Controller
        control={control}
        name={name}
        rules={{required: required ? "This field is required" : false}}
        render={({field: {onChange, value = "", ref}}) => (
          <Select
            className="select-mui"
            ref={ref}
            value={value}
            onChange={e => {
              onChange(e.target.value);
              handleCustomChange && handleCustomChange(e.target.value);
            }}
            disabled={isLoading || isDisabled}
            displayEmpty
            error={errors[name]}
          >
            {isLoading && (
              <MenuItem value={""} disabled className="center">
                Loading...
              </MenuItem>
            )}
            {!isLoading && placeholder && (
              <MenuItem className="menu-item placeholder" value={""}>
                {placeholder}
              </MenuItem>
            )}
            {!isLoading &&
              selectOption.map((option, i) => {
                return (
                  <MenuItem
                    key={`option-${i}`}
                    className={`menu-item ${menuClasses || ""}`}
                    value={typeof option === "string" ? option : option.value}
                  >
                    {typeof option === "string" ? option : option.label}
                  </MenuItem>
                );
              })}
            {(fetchErr || selectOption.length === 0) && (
              <MenuItem value={null} disabled className="center">
                {noOptionMsg || "No Options"}
              </MenuItem>
            )}
          </Select>
        )}
      />
      {error && <InputErrorMsg errMsg={error.message} />}
    </FormControl>
  );
}
