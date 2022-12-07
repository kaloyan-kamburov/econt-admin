import React, { useRef } from "react";
import { CKEditor } from "ckeditor4-react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";

//MUI components
import Grid from "@mui/material/Grid";

//validations
import { required } from "../../../utils/validations/validations";

//custom components
import Input from "../../../components/form/Input/Input.component";
import InputImage from "../../../components/form/InputImage/InputImage.component";

interface Props {
  data: any;
}

const InnerFieldWrapper = styled.div`
  width: 100%;
  max-width: calc(114.4 * var(--atom));
`;

const PageGroup: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Form
      onSubmit={(values: any) => {}}
      render={({ handleSubmit, invalid, errors, values, form }) => (
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          style={{ width: "100%" }}
        >
          <Grid
            container
            spacing={2}
            sx={{ marginTop: "24px" }}
          >
            <Grid
              item
              xs={12}
            >
              <InnerFieldWrapper>
                <InputImage
                  name="file"
                  label={t("form.labels.uploadImage")}
                  desc={t("pages.home.uploadFileDesc")}
                  onImgPick={(values) => {
                    form.mutators.setFormValue("file", values.file || values.id);
                  }}
                />
              </InnerFieldWrapper>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <InnerFieldWrapper>
                <Input
                  // name={`languages.${lang}.name`}
                  name="name"
                  label={t("form.labels.categoryName")}
                  validate={[required(t("form.validations.required"))]}
                  required
                />
              </InnerFieldWrapper>
            </Grid>
          </Grid>
          <Editor
            // onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
              toolbar: "undo redo | formatselect | " + "bold italic backcolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {/* <CKEditor
            style={{ width: "100%" }}
            initData="<p>Hello from CKEditor 4!</p>"
            onInstanceReady={() => {}}
          /> */}
        </form>
      )}
    />
  );
};

export default PageGroup;
