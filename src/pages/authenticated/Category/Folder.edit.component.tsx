import React, { useState } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

//validations
import { required } from "../../../utils/validations/validations";

//custom components
import Input from "../../../components/form/Input/Input.component";
import InputFile from "../../../components/form/InputFile/InputFile.component";

interface Props {
  closeFn: () => void;
}

const EditFolder: React.FC<Props> = ({ closeFn }) => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<number>(0);

  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => setTab(newValue);
  return (
    <>
      <Form
        onSubmit={() => {}}
        validate={(values) => {
          const errors: any = {};
          if (!values.file) {
            errors.file = t("form.validations.required");
          }
          return errors;
        }}
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
                <Tabs
                  value={tab}
                  onChange={onChangeTab}
                  aria-label="basic tabs example"
                >
                  <Tab label="Български" />
                  <Tab label="English" />
                </Tabs>
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
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  onClick={() => {}}
                  sx={{
                    width: "auto",
                  }}
                  disabled={invalid}
                >
                  {t("common.changeAndPublish")}
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  size="large"
                  onClick={() => {}}
                  sx={{
                    width: "auto",
                    marginLeft: "auto",
                    marginRight: "calc(2 * var(--atom))",
                  }}
                  disabled={invalid}
                >
                  {t("common.save")}
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={closeFn}
                  sx={{
                    width: "auto",
                    marginLeft: 0,
                  }}
                >
                  {t("common.cancel")}
                </Button>
              </Grid>
            </Grid>
            {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
          </form>
        )}
      />
    </>
  );
};

export default EditFolder;
