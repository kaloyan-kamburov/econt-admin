import React from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//validations
import { required } from "../../../utils/validations/validations";

//custom components
import Input from "../../../components/form/Input/Input.component";
import InputFile from "../../../components/form/InputFile/InputFile.component";

interface Props {}

const AddCategory: React.FC<Props> = () => {
  const { t } = useTranslation();
  return (
    <>
      <Form
        onSubmit={() => {}}
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
                <InputFile
                  name="file"
                  label={t("form.labels.uploadImage")}
                  desc={t("pages.home.uploadFileDesc")}
                  isImage
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Input
                  name="name"
                  label={t("form.labels.categoryName")}
                  validate={[required(t("form.validations.required"))]}
                  required
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Input
                  name="description"
                  label={t("form.labels.description")}
                  validate={[required(t("form.validations.required"))]}
                  required
                  rows={3}
                  maxRows={3}
                  multiline
                />
              </Grid>
            </Grid>
          </form>
        )}
      />
    </>
  );
};

export default AddCategory;
