import React, { useState } from "react";
import styled from "@emotion/styled";
import { Field } from "react-final-form";
import { useTranslation } from "react-i18next";

import Button from "@mui/material/Button";
import IconFile from "@mui/icons-material/AttachFileOutlined";
// import PreviewIcon from "@mui/icons-material/Preview";
import DescriptionIcon from "@mui/icons-material/Description";
import IconClose from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import Modal from "../../common/Modal/Modal.component";
import ImagePicker from "../../common/ImagePicker/ImagePicker.component";

//theme
import { errorColor, inputBorder, bgHeaders } from "../../../styles/theme";

import composeValidators from "../composeValidators";

// interface Props {
//   name: string;
//   label: string;
//   required?: boolean;
//   accept?: string;
//   multiple?: boolean;
//   validate?: Fn[] | any;
//   type?: string;
//   disabled?: boolean;
//   form?: any;
// }

// const ButtonWrapper = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   width: 100%;
//   align-items: center;
//   max-width: 200px;
//   .btn-has-error {
//     color: ${errorColor};
//     border: 1px solid ${errorColor};
//   }
// `;

// const ErrorWrapper = styled.span`
//   color: ${errorColor};
//   width: 100%;
//   margin-top: 3px;
//   margin-left: 14px;
//   font-size: 0.75rem;
// `;

// const FileList = styled.div`
//   width: 100%;
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: column;
//   padding: 5px 15px;
//   border: 1px solid rgba(118, 118, 118, 0.3);
//   border-radius: 4px;
//   margin-top: 10px;
// `;

// const FileWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   padding: 5px 0;
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px solid rgba(118, 118, 118, 0.3);
//   span {
//     display: flex;
//     align-items: center;
//     cursor: pointer;
//     &:hover {
//       color: rgb(12, 74, 153) !important;
//       text-decoration: underline;
//       .icon-file {
//         fill: rgb(12, 74, 153);
//       }
//     }
//     .icon-file {
//       fill: #adadad;
//       margin-right: 5px;
//     }
//   }
//   &:last-of-type {
//     border: none;
//   }
// `;

// const Input: React.FC<Props> = ({
//   name,
//   label,
//   required = false,
//   accept = "*",
//   multiple = false,
//   validate = [],
//   disabled = false,
//   form,
// }) => {
//   const [files, setFiles] = useState<any[]>([]);
//   return (
//     <FieldWrapper className="file-input" style={{ minHeight: "38px" }}>
//       <Field name={name} validate={composeValidators(...(validate || []))}>
//         {(props: any) => (
//           <>
//             <ButtonWrapper>
//               <Button
//                 variant="outlined"
//                 component="label"
//                 startIcon={<IconFile />}
//                 disabled={disabled}
//                 sx={
//                   props.meta.error && props.meta.touched
//                     ? { width: "100%", border: `1px solid ${errorColor}` }
//                     : { width: "100%" }
//                 }
//                 className={
//                   props.meta.error && props.meta.touched ? "btn-has-error" : ""
//                 }
//               >
//                 {label}
//                 {required && " *"}
//                 <input
//                   type="file"
//                   accept={accept}
//                   hidden
//                   multiple={multiple}
//                   onChange={(e: any) => {
//                     form.mutators.setFileTouched();

//                     if (e.target && e.target.files) {
//                       const newFiles: any = [];
//                       for (let i = 0, f; (f = e.target.files[i]); i++) {
//                         newFiles.push(f);
//                       }

//                       setFiles([...newFiles]);
//                     }

//                     props.input.onChange([
//                       // ...props.input.value,
//                       ...e.target.files,
//                     ]);
//                     e.target.value = null;
//                   }}
//                 />
//               </Button>
//             </ButtonWrapper>
//             {files.length > 0 && (
//               <FileList>
//                 {files.map((file, i) => (
//                   <FileWrapper key={i}>
//                     <span
//                       onClick={() => {
//                         // let reader = new FileReader();
//                         // reader.onload = (fileData: any) => {
//                         //   window.open(fileData, "_blank");
//                         // };
//                         window.open(window.URL.createObjectURL(file), "_blank");
//                         // reader.readAsDataURL(file);
//                       }}
//                     >
//                       <DescriptionIcon className="icon-file" />
//                       {file.name}
//                     </span>
//                     <IconButton
//                       color="primary"
//                       aria-label="upload picture"
//                       component="span"
//                       // disabled={disabled}
//                       onClick={() => {
//                         setFiles(files.filter((el, idx) => idx !== i));
//                         props?.input?.onChange && props.input.onChange([]);
//                         // props.input.onChange(
//                         //   props.input &&
//                         //     props.input.value &&
//                         //     typeof props.input.value.filter === "function"
//                         //     ? props.input.value.filter(
//                         //         (f: any, idx: any) => idx !== i
//                         //       )
//                         //     : []
//                         // );
//                         // setTimeout(() => {
//                         //   props.input.onChange(
//                         //     props.input.value
//                         //       .split("|")
//                         //       .filter((el, idx) => idx !== i)

//                         //       .join("|")
//                         //   );
//                         // });
//                       }}
//                     >
//                       <IconClose />
//                     </IconButton>
//                   </FileWrapper>
//                 ))}
//               </FileList>
//             )}

//             <ErrorWrapper>
//               {props.meta.touched && props.meta.error ? props.meta.error : ""}
//             </ErrorWrapper>
//           </>
//         )}
//       </Field>
//     </FieldWrapper>
//   );
// };

// export default Input;

const InputFileWrapper = styled.div`
  width: 100%;
  padding: calc(4 * var(--atom));
  border: 1px dashed ${inputBorder};
  border-radius: calc(2.4 * var(--atom));
  position: relative;
  cursor: pointer;
  background: ${bgHeaders};

  input {
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .input-file-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    .label {
      font-size: calc(3 * var(--atom));
      line-height: calc(5 * var(--atom));
      margin-top: calc(1.2 * var(--atom));
      cursor: pointer;
    }

    .desc {
      font-size: calc(2.4 * var(--atom));
      line-height: calc(3.6 * var(--atom));
      margin-top: calc(1.2 * var(--atom));
    }
  }
  &.error {
    border-color: ${errorColor};
  }
`;

const ErrorWrapper = styled.div`
  height: calc(4.6 * var(--atom));
  font-size: calc(2.4 * var(--atom));
  color: ${errorColor};
  padding-left: calc(2.8 * var(--atom));
  display: flex;
  align-items: center;
`;

const FilePreview = styled.div`
  width: calc(25 * var(--atom));
  height: calc(25 * var(--atom));
  margin-bottom: calc(4 * var(--atom));
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const renderIcon = (image: boolean) =>
  image ? (
    <svg
      width="49"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.5 38C26.5 39.4 26.76 40.74 27.2 42H10.5C8.3 42 6.5 40.22 6.5 38V10C6.5 7.8 8.3 6 10.5 6H38.5C40.72 6 42.5 7.8 42.5 10V26.7C41.24 26.26 39.9 26 38.5 26V10H10.5V38H26.5ZM28.42 24.58L22.92 31.66L19 26.94L13.5 34H27.2C28 31.76 29.44 29.82 31.3 28.42L28.42 24.58ZM40.5 36V30H36.5V36H30.5V40H36.5V46H40.5V40H46.5V36H40.5Z"
        fill="#212121"
      />
    </svg>
  ) : (
    <svg
      width="49"
      height="49"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46.5 36.5H40.5V30.5H36.5V36.5H30.5V40.5H36.5V46.5H40.5V40.5H46.5M12.5 4.5C10.28 4.5 8.5 6.3 8.5 8.5V40.5C8.5 42.72 10.28 44.5 12.5 44.5H28.12C27.4 43.26 26.9 41.9 26.66 40.5H12.5V8.5H26.5V18.5H36.5V26.66C37.16 26.56 37.84 26.5 38.5 26.5C39.18 26.5 39.84 26.56 40.5 26.66V16.5L28.5 4.5M16.5 24.5V28.5H32.5V24.5M16.5 32.5V36.5H26.5V32.5H16.5Z"
        fill="black"
      />
    </svg>
  );

type Fn = (value: string | number) => boolean | undefined;
interface Props {
  name: string;
  isImage?: boolean;
  label?: string;
  desc?: string;

  ///
  required?: boolean;

  accept?: string;
  validate?: Fn[] | any;
  // type?: string;
  disabled?: boolean;
  // form?: any;
  onImgPick?: (values: any) => void;
}
const InputFile: React.FC<Props> = ({
  name,
  isImage = false,
  label = "",
  desc = "",
  onImgPick = () => {},

  required = false,
  accept = "*",
  validate = [],
  disabled = false,
  // form,
}) => {
  const [file, setFile] = useState<any>(null);
  const [modalImages, setModalImages] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Field
        name={name}
        // validate={composeValidators(...(validate || []))}
      >
        {(props: any) => {
          return (
            <>
              {file && (
                <FilePreview>
                  <img
                    src={file}
                    alt="file"
                  />
                </FilePreview>
              )}

              <InputFileWrapper className={props.meta.touched && props.meta.error ? "error" : ""}>
                {/* <input
                  type="file"
                  name={name}
                  accept={accept}
                  // {...props.input}
                  onChange={(e: any) => {
                    props.input.onChange(e.target.files?.[0]);
                    setFile(e.target.files?.[0] || null);
                  }}
                /> */}
                <div
                  className="input-file-content"
                  onClick={() => setModalImages(true)}
                >
                  {renderIcon(isImage)}
                  {label && <span className="label">{label}</span>}
                  {desc && <span className="desc">{desc}</span>}
                </div>
              </InputFileWrapper>
              <ErrorWrapper>{props.meta.touched && props.meta.error && props.meta.error}</ErrorWrapper>
              {modalImages && (
                <Modal
                  closeFn={() => {
                    setModalImages(false);
                  }}
                  title={t("common.images")}
                  xxl
                >
                  <ImagePicker
                    onImgPick={(values) => {
                      setModalImages(false);
                      setFile(values.fileUrl);
                      onImgPick(values);
                    }}
                    closeFn={() => setModalImages(false)}
                  />
                </Modal>
              )}
            </>
          );
        }}
      </Field>
    </>
  );
};

export default InputFile;
