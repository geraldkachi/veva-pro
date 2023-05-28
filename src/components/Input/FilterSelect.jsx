import {Controller, useFormContext} from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputErrorMsg from "./InputErrorMsg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function FilterSelect({
  name,
  errMsg,
  className,
  required = true,
  selectOption,
  label,
  isDisabled,
  handleCustomChange,
  ...otherProps
}) {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  return (
    <FormControl
      sx={{m: "10px 0"}}
      className={`form-group select-group ${className}`}
    >
      <Controller
        control={control}
        name={name}
        rules={{required: required ? errMsg : false}}
        render={({field: {onChange, value = "", ref}}) => (
          <Select
            className="select-mui filter-select"
            ref={ref}
            value={value}
            onChange={value => {
              onChange(value);
              handleCustomChange && handleCustomChange(value);
            }}
            IconComponent={KeyboardArrowDownIcon}
            defaultValue={selectOption[0].value}
            renderValue={selected =>
              selected
                ? `${label} : ${selected}`
                : `${label} : ${selectOption[1].value}`
            }
            {...otherProps}
            displayEmpty
          >
            {selectOption.map(item => {
              return (
                <MenuItem
                  key={item.value}
                  className="menu-item"
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        )}
      />
      {errMsg && errors[name] && (
        <InputErrorMsg errMsg={errors[name].message} />
      )}
    </FormControl>
  );
}
