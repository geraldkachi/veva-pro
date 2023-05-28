import {Button} from "@mui/material";
import {useDropzone} from "react-dropzone";
import {Controller, useFormContext} from "react-hook-form";
import {truncateString} from "utils/utils";
import "./style.scss";

const UploadPdf = ({
  name,
  filesAccepted,
  label,
  placeholder = "Upload File",
  ...rest
}) => {
  const {control} = useFormContext();

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: filesAccepted.join(", "),
    multiple: false,
  });
  console.log(acceptedFiles[0]);
  return (
    <Controller
      render={({field: {onChange}}) => (
        <div className="form-group upload-pdf">
          <label htmlFor="">{label}</label>
          <div className={`input`} {...getRootProps()}>
            <p>
              {acceptedFiles[0]
                ? truncateString(acceptedFiles[0].name)
                : placeholder}
            </p>
            <input
              {...rest}
              {...getInputProps({
                onChange: e => {
                  onChange(e.target.files);
                },
              })}
            />
            <Button
              variant="contained"
              color={acceptedFiles[0] ? "red" : "primary"}
            >
              {acceptedFiles[0] ? "Change file" : "Upload file"}
            </Button>
          </div>
        </div>
      )}
      name={name}
      control={control}
    />
  );
};

export default UploadPdf;
