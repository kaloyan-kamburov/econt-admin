import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Field } from "react-final-form";
import IconFile from "@mui/icons-material/AttachFileOutlined";
// import PreviewIcon from "@mui/icons-material/Preview";
import DescriptionIcon from "@mui/icons-material/Description";
import IconClose from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import { errorColor } from "../../../styles/theme";

import composeValidators from "../composeValidators";
import { FieldWrapper } from "../../layout/layout.components";

type Fn = (value: string | number) => boolean | undefined;

interface Props {
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  validate?: Fn[] | any;
  type?: string;
  disabled?: boolean;
  form?: any;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  max-width: 200px;
  .btn-has-error {
    color: ${errorColor};
    border: 1px solid ${errorColor};
  }
`;

const ErrorWrapper = styled.span`
  color: ${errorColor};
  width: 100%;
  margin-top: 3px;
  margin-left: 14px;
  font-size: 0.75rem;
`;

const FileList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 5px 15px;
  border: 1px solid rgba(118, 118, 118, 0.3);
  border-radius: 4px;
  margin-top: 10px;
`;

const FileWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(118, 118, 118, 0.3);
  span {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: rgb(12, 74, 153) !important;
      text-decoration: underline;
      .icon-file {
        fill: rgb(12, 74, 153);
      }
    }
    .icon-file {
      fill: #adadad;
      margin-right: 5px;
    }
  }
  &:last-of-type {
    border: none;
  }
`;

const Input: React.FC<Props> = ({
  name,
  label,
  required = false,
  accept = "*",
  multiple = false,
  validate = [],
  disabled = false,
  form,
}) => {
  const [files, setFiles] = useState<any[]>([]);
  return (
    <FieldWrapper className="file-input" style={{ minHeight: "38px" }}>
      <Field name={name} validate={composeValidators(...(validate || []))}>
        {(props: any) => (
          <>
            <ButtonWrapper>
              <Button
                variant="outlined"
                component="label"
                startIcon={<IconFile />}
                disabled={disabled}
                sx={
                  props.meta.error && props.meta.touched
                    ? { width: "100%", border: `1px solid ${errorColor}` }
                    : { width: "100%" }
                }
                className={
                  props.meta.error && props.meta.touched ? "btn-has-error" : ""
                }
              >
                {label}
                {required && " *"}
                <input
                  type="file"
                  accept={accept}
                  hidden
                  multiple={multiple}
                  onChange={(e: any) => {
                    form.mutators.setFileTouched();

                    if (e.target && e.target.files) {
                      const newFiles: any = [];
                      for (let i = 0, f; (f = e.target.files[i]); i++) {
                        newFiles.push(f);
                      }

                      setFiles([...newFiles]);
                    }

                    props.input.onChange([
                      // ...props.input.value,
                      ...e.target.files,
                    ]);
                    e.target.value = null;
                  }}
                />
              </Button>
            </ButtonWrapper>
            {files.length > 0 && (
              <FileList>
                {files.map((file, i) => (
                  <FileWrapper key={i}>
                    <span
                      onClick={() => {
                        // let reader = new FileReader();
                        // reader.onload = (fileData: any) => {
                        //   window.open(fileData, "_blank");
                        // };
                        window.open(window.URL.createObjectURL(file), "_blank");
                        // reader.readAsDataURL(file);
                      }}
                    >
                      <DescriptionIcon className="icon-file" />
                      {file.name}
                    </span>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      // disabled={disabled}
                      onClick={() => {
                        setFiles(files.filter((el, idx) => idx !== i));
                        props?.input?.onChange && props.input.onChange([]);
                        // props.input.onChange(
                        //   props.input &&
                        //     props.input.value &&
                        //     typeof props.input.value.filter === "function"
                        //     ? props.input.value.filter(
                        //         (f: any, idx: any) => idx !== i
                        //       )
                        //     : []
                        // );
                        // setTimeout(() => {
                        //   props.input.onChange(
                        //     props.input.value
                        //       .split("|")
                        //       .filter((el, idx) => idx !== i)

                        //       .join("|")
                        //   );
                        // });
                      }}
                    >
                      <IconClose />
                    </IconButton>
                  </FileWrapper>
                ))}
              </FileList>
            )}

            <ErrorWrapper>
              {props.meta.touched && props.meta.error ? props.meta.error : ""}
            </ErrorWrapper>
          </>
        )}
      </Field>
    </FieldWrapper>
  );
};

export default Input;
