import React, { useState, useEffect } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

//MUI components
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

//validations
import { required } from "../../../utils/validations/validations";

//custom components
import Input from "../../../components/form/Input/Input.component";
import InputImage from "../../../components/form/InputImage/InputImage.component";

//utils
import axios from "../../../utils/api";

//hooks
import useAuth from "../../../hooks/useAuth";
import useCategories from "../../../hooks/useCategories";

interface Props {
  closeFn: () => void;
  id: string;
}

const EditFolder: React.FC<Props> = ({ closeFn, id }) => {
  const [tab, setTab] = useState<number>(0);
  const [initialValues, setInitialValues] = useState<any>({});

  const { user } = useAuth();
  const { t } = useTranslation();
  const { categories, setCategories } = useCategories();

  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => setTab(newValue);

  const { refetch: getCategoryData } = useQuery(
    "getCategoryData",
    async () => {
      const data = await axios(`categories/${id}`);
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          // setCategories(data?.data || []);
          setInitialValues(data?.data);
        }
      },
      onError: (error: AxiosError) => {
        // setLoadFailed(true);
        toast.error(error?.message || `${t("pages.login.loginError")}`);
      },
    }
  );

  //save and publish category
  const saveAndPublishCategory = useMutation(
    async (values: any) => {
      const data = await axios.post("categories/save-publish", values);
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          setCategories([...categories, data?.data]);
          toast.success(`${t("pages.home.categorySavedAndPublished")}`);
          closeFn();
        }
      },
    }
  );

  //save category
  const saveCategory = useMutation(
    async (values: any) => {
      const data = await axios.post("categories/save", values);
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          setCategories([...categories, data?.data]);
          toast.success(`${t("pages.home.categorySaved")}`);
          closeFn();
        }
      },
    }
  );

  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <>
      <Form
        onSubmit={(values) => saveAndPublishCategory.mutate(values)}
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};
          if (!values.file) {
            errors.file = t("form.validations.required");
          }

          if (
            Array.isArray(user?.languages) &&
            !user?.languages.every((lang) => {
              return values?.languages?.[lang]?.name && values?.languages?.[lang]?.description;
            })
          ) {
            errors.notFilled = t("form.validations.required");
          }
          return errors;
        }}
        mutators={{
          setFormValue: ([fieldName, fieldVal], state, form) => {
            form.changeValue(state, fieldName, () => fieldVal);
          },
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
                <InputImage
                  name="file"
                  label={t("form.labels.uploadImage")}
                  desc={t("pages.home.uploadFileDesc")}
                  onImgPick={(values) => {
                    form.mutators.setFormValue("file", values.file || values.id);
                  }}
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
                  {Array.isArray(user?.languages) ? user?.languages.map((lang) => <Tab label={t(`languages.${lang}`)} />) : null}
                </Tabs>
              </Grid>
              {Array.isArray(user?.languages)
                ? user?.languages.map((lang, i) =>
                    tab === i ? (
                      <React.Fragment key={lang}>
                        <Grid
                          item
                          xs={12}
                        >
                          <Input
                            name={`languages.${lang}.name`}
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
                            name={`languages.${lang}.description`}
                            label={t("form.labels.description")}
                            validate={[required(t("form.validations.required"))]}
                            required
                            rows={3}
                            maxRows={3}
                            multiline
                          />
                        </Grid>
                      </React.Fragment>
                    ) : null
                  )
                : null}

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
                  {t("common.saveAndPublish")}
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  size="large"
                  onClick={() => saveCategory.mutate(values)}
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
