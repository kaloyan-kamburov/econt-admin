import React, { useState } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//validations
import { required } from "../../../utils/validations/validations";

//custom components
import Input from "../../../components/form/Input/Input.component";
import Loader from "../../../components/common/Loader/Loader.component";
// import Select from "../../../components/form/Select/Select.component";

interface Props {
  closeFn: () => void;
}

const AddGroup: React.FC<Props> = ({ closeFn }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <>
      <Form
        onSubmit={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            closeFn();
          }, 1000);
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
                <Input
                  name="name"
                  label={t("form.labels.groupName")}
                  validate={[required(t("form.validations.required"))]}
                  required
                />
                {/* <Select
                  name="place"
                  label="Тип на сметката"
                  options={[
                    {
                      label: "asd",
                      value: "asd",
                    },
                  ]}
                  validate={[required("form.validations.required")]}
                /> */}
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
                  {t("common.upload")}
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={closeFn}
                  sx={{
                    width: "auto",
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
      {loading && (
        <Loader
          showExplicit
          inModal
        />
      )}
    </>
  );
};

export default AddGroup;
