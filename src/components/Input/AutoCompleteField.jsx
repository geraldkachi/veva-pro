import * as React from "react";
import {Controller, useFormContext, get} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Autocomplete,
  createFilterOptions,
  FormLabel,
  TextField,
} from "@mui/material";
import InputErrorMsg from "./InputErrorMsg";
import {generateId} from "../../utils/utils";
const filter = createFilterOptions();
export default function AutoCompleteField({
  name,
  errMsg,
  className,
  required = true,
  selectOption = [],
  label,
  handleCustomChange,
  placeholder,
  ...props
}) {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const id = generateId();
  const error = get(errors, name);
  return (
    <FormControl
      sx={{m: "10px 0"}}
      className={`form-group select-group ${className}`}
    >
      {label && (
        <FormLabel htmlFor={name}>
          {label} {required && <span className="clr-redClr">*</span>}
        </FormLabel>
      )}
      <Controller
        control={control}
        name={name}
        id={id}
        rules={{required: required ? errMsg : false}}
        render={({field: {onChange, value = "", ref}}) => (
          <Autocomplete
            {...props}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            disablePortal
            className="select-mui"
            options={selectOption ? selectOption : []}
            ref={ref}
            filterOptions={(options, params) => {
              // Suggest the creation of a new value if the autocomplete is a free solo type
              if (props.freeSolo) {
                const filtered = filter(options, params);
                const {inputValue} = params;
                const isExisting = options.some(
                  option => inputValue === (option.value || option)
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push(inputValue);
                }
                return filtered;
              } else return filter(options, params);
            }}
            handleHomeEndKeys
            value={value}
            onChange={(e, value) => {
              onChange(value);
              if (handleCustomChange) {
                handleCustomChange(value);
              }
            }}
            renderInput={params => (
              <TextField {...params} placeholder={placeholder} />
            )}
          />
        )}
      />
      {error && <InputErrorMsg errMsg={error.message} />}
    </FormControl>
  );
}
