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
import usePageError from "../../../hooks/usePageError";

//types
import { TLanguage } from "../../../context/auth";
import { TCategory } from "../../../context/categories";

interface Props {
  closeFn: () => void;
  id: number | string;
}

const EditCategory: React.FC<Props> = ({ closeFn, id }) => {
  const { languages } = useAuth();
  const { t } = useTranslation();
  const { categories, setCategories } = useCategories();
  const { setVisibleError, setRetryFn, setErrorMsg } = usePageError();

  const [initialValues, setInitialValues] = useState<any>({});
  const [tab, setTab] = useState<number>(0);
  const [shouldPublish, setShouldPublish] = useState<boolean>(false);

  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => setTab(newValue);

  //get category
  const { refetch: getCategoryData } = useQuery(
    "getCategoryData",
    async () => {
      const data = await axios(`categories/${id}/edit`);
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          // setCategories(data?.data || []);
          setInitialValues(data?.data?.data);
        }
      },
      onError: (error: AxiosError) => {
        setVisibleError(true);
      },
    }
  );

  //update category
  const updateCategory = useMutation(
    async (values: any) => {
      const valuesForSend: any = {
        image_id: values?.image?.id || values.image,
        path: values?.imgPath || values?.image.path || null,
        published: false,
      };
      Array.isArray(languages) &&
        languages.forEach((lang: TLanguage) => {
          valuesForSend[`name:${lang.code}`] = values?.[`name:${lang.code}`];
          valuesForSend[`description:${lang.code}`] = values?.[`description:${lang.code}`];
        });
      const data = await axios.put(`categories/${id}`, valuesForSend);
      return { ...data, newValues: valuesForSend };
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          let updatedCategoryIndex = categories.findIndex((cat: TCategory) => cat.id === id);
          if (updatedCategoryIndex > -1) {
            const newValues = data?.newValues || {};
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const newCategories = [...categories];
            newCategories[updatedCategoryIndex] = {
              ...newCategories[updatedCategoryIndex],
              image: { ...(newCategories?.[updatedCategoryIndex]?.image || {}), path: newValues.path },
              ...newValues,
            };
            setCategories(newCategories);
          }
          toast.success(`${t("pages.home.categoryUpdated")}`);

          if (shouldPublish) {
            setTimeout(() => publishCategory.mutate());
          } else {
            closeFn();
          }
        }
      },
      onError: (error) => {
        setVisibleError(true);
      },
    }
  );

  //publish category
  const publishCategory = useMutation(
    async () => {
      setRetryFn({
        execute: () => publishCategory.mutate(),
      });
      const data = await axios.patch(`categories/${id}/publish`, {
        published: true,
      });
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          const updatedCategoryIndex = categories.findIndex((cat: TCategory) => cat.id === id);
          if (updatedCategoryIndex) {
            const newCategories = [...categories];
            newCategories[updatedCategoryIndex].published = true;
            setCategories(newCategories);
          }
          toast.success(`${t("pages.home.categoryPublished")}`);
          setShouldPublish(false);
        }
      },
      onError: () => {
        setErrorMsg(t("common.errorPublishCategory"));
        setVisibleError(true);
      },
    }
  );

  useEffect(() => {
    setRetryFn({
      execute: () => getCategoryData(),
    });
    getCategoryData();
  }, []);

  return (
    <>
      <Form
        onSubmit={(values) => {
          setRetryFn({
            execute: () => updateCategory.mutate(values),
          });
          updateCategory.mutate(values);
        }}
        initialValues={initialValues}
        validate={(values) => {
          const errors: any = {};
          if (!values.image) {
            errors.image = t("form.validations.required");
          }

          if (
            Array.isArray(languages) &&
            !languages.every((lang: TLanguage) => {
              return values?.[`name:${lang.code}`] && values?.[`description:${lang.code}`];
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
                  name="image"
                  label={t("form.labels.uploadImage")}
                  desc={t("pages.home.uploadFileDesc")}
                  onImgPick={(values) => {
                    form.mutators.setFormValue("image", values.image);
                    form.mutators.setFormValue("imgPath", values.imgPath);
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
                  {Array.isArray(languages) ? languages.map((lang: TLanguage) => <Tab label={t(`languages.${lang.code}`)} />) : null}
                </Tabs>
              </Grid>
              {Array.isArray(languages)
                ? languages.map((lang, i) =>
                    tab === i ? (
                      <React.Fragment key={lang.code}>
                        <Grid
                          item
                          xs={12}
                        >
                          <Input
                            name={`name:${lang.code}`}
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
                            name={`description:${lang.code}`}
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
                  size="large"
                  onClick={(e) => {
                    e.preventDefault();
                    setShouldPublish(true);
                    setRetryFn({
                      execute: () => updateCategory.mutate(values),
                    });
                    setTimeout(() => {
                      updateCategory.mutate(values);
                    });
                  }}
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
                  type="submit"
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
            {/* <pre>{JSON.stringify(errors, null, 4)}</pre> */}
          </form>
        )}
      />
    </>
  );
};

export default EditCategory;
