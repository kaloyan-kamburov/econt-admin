import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Form } from "react-final-form";
import { useTranslation, Trans } from "react-i18next";
import { useQuery } from "react-query";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useMutation } from "react-query";

//MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//custom components
import Input from "../../../components/form/Input/Input.component";
import Modal from "../../../components/common/Modal/Modal.component";

//validations
import { required } from "../../../utils/validations/validations";

//icons
import { IconTrash } from "../../../Icons/icons";
import { IconPlus } from "../../../Icons/icons";

//utils
import axios from "../../../utils/api";

//styles
import { inputBorder, btnContainedPrimaryBgColor, errorColor, bgHeaders } from "../../../styles/theme";
import toast from "react-hot-toast";

const Content = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  flex: 1;

  form {
    flex: 1;
    max-height: 100%;
  }

  .inner-content {
    display: flex;
    position: relative;
    flex: 1;
    height: 100%;
    max-height: 100%;
  }

  .left-content {
    width: 36.5%;
    display: flex;
    flex-direction: column;
    padding: calc(2 * var(--atom));
    justify-content: flex-start;

    .img-wrapper {
      width: 100%;
      height: 50%;
      max-height: 50%;
      overflow: hidden;
      border: 1px solid ${inputBorder};
      border-radius: var(--atom);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${bgHeaders};

      &.error {
        border-color: ${errorColor};
      }

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .fields-wrapper {
      flex: 1;
      display: flex;
      alitn-items: flex-start;
    }
  }

  .right-content {
    width: 63.5%;
    display: flex;
    justify-content: center;
    overflow-y: auto;

    .inner-content {
      width: 100%;
      display: block;
    }

    .img-wrapper {
      float: left;
      padding: calc(2 * var(--atom));
      border-radius: calc(0.8 * var(--atom));
      width: calc(24 * var(--atom));
      height: calc(24 * var(--atom));
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      &:hover {
        .inner {
          cursor: pointer;
        }
      }
      .inner {
        width: 100%;
        height: 100%;
        border-radius: calc(0.8 * var(--atom));
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        &:hover {
          opacity: 0.5;
        }
        span {
          font-size: calc(3 * var(--atom));
          line-height: calc(5 * var(--atom));
        }
        input {
          opacity: 0;
          top: 0;
          left: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
      &.select {
        .inner {
          border: 1px dashed ${btnContainedPrimaryBgColor};
          color: ${btnContainedPrimaryBgColor};
          svg {
            max-width: calc(8 * var(--atom));
            max-height: calc(8 * var(--atom));
            margin-bottom: calc(1.4 * var(--atom));
          }
        }
      }
      img {
        max-width: 100%;
        // max-height: 100%;
        border-radius: calc(0.8 * var(--atom));
      }
    }
  }

  .form-btns-wrapper {
  }

  .details-section {
    display: flex;
    flex-direction: column;
    h5 {
      font-size: calc(4 * var(--atom));
      line-height: calc(5.4 * var(--atom));
      font-weight: 300;
      margin: 0 0 calc(2 * var(--atom)) 0;
    }
    .spec {
      display: flex;
      flex-direction: colimn;
      align-items: flex-start;
      margin-top: var(--atom);

      .type,
      .value {
        font-size: calc(3 * var(--atom));
        line-height: calc(5 * var(--atom));
        width: calc(25 * var(--atom));
      }
    }
  }
`;

interface Props {
  closeFn: () => void;
  onImgPick: (values: any) => void;
}

type Image = {
  id: string;
  path: string;
  name: string;
  alt: string;
  size?: string;
};

const ImagePicker: React.FC<Props> = ({ closeFn, onImgPick }) => {
  const { t } = useTranslation();
  const formRef = useRef();
  const [images, setImages] = useState<Image[]>([]);
  const [file, setFile] = useState<any>(null);
  const [chosenImage, setChosenImage] = useState<Image | null>(null);
  const [inputRendered, setInputRendered] = useState<boolean>(true);
  const [imageDelete, setImageDelete] = useState<boolean>(false);
  const [form, setForm] = useState<any>(null);

  //get images
  const { refetch: getImages } = useQuery(
    "getImages",
    async () => {
      const data = await axios("galleries?page[size]=100000");
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setImages(data.data?.data);
        }
      },
      onError: (error: AxiosError) => {
        console.log(error);
      },
    }
  );

  //upload image
  const uploadImage = useMutation(
    async (values: any) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("alt", values.alt);
      formData.append("image", values.image);
      const data = await axios.post("galleries", formData);
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          const uploadImageData: any = {
            image: data?.data?.data?.id,
            imgPath: data?.data?.data?.path,
          };
          onImgPick(uploadImageData);
        }
      },
    }
  );

  //delete image
  const deleteImage = useMutation(
    async (callback: any) => {
      const data = await axios.delete(`galleries/${chosenImage?.id}`);
      return { ...data, data: { ...data?.data, callback } };
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          setImages(images.filter((img) => img.id !== chosenImage?.id));
          setChosenImage(null);
          setImageDelete(false);
          data.callback && data.callback();
          toast.success(`${t("common.deleteImageSuccess")}`);
        }
      },
    }
  );

  useEffect(() => {
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertToSize = (size: number) => (size === 0 ? null : size < 1000000 ? (size / 1000).toFixed(2) + " KB" : (size / 1000000).toFixed(2) + " MB");

  const resetInput = () => {
    setInputRendered(false);
    setTimeout(() => setInputRendered(true));
  };

  return (
    <>
      <Content>
        <Form
          ref={formRef}
          onSubmit={(values: any) => {
            if (["number", "string"].includes(typeof values.image)) {
              onImgPick(values);
            } else {
              uploadImage.mutate(values);
            }
          }}
          mutators={{
            setFormValue: ([fieldName, fieldVal], state, form) => {
              form.changeValue(state, fieldName, () => fieldVal);
            },
            setFieldTouched: ([fieldName, touched], state) => {
              const field = state.fields[fieldName];
              if (field) {
                field.touched = !!touched;
              }
            },
          }}
          validate={(values) => {
            const errors: any = {};

            if (!values.image) {
              errors.fileRequired = t("form.validations.required");
            }

            return errors;
          }}
          render={({ handleSubmit, invalid, errors, values, form }) => (
            <form
              autoComplete="off"
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
            >
              <div className="inner-content">
                <div className="left-content">
                  <div className={`img-wrapper${!values.image && form.getFieldState("image")?.touched ? " error" : ""}`}>
                    {(chosenImage || file) && (
                      <img
                        src={chosenImage ? chosenImage.path : URL.createObjectURL(file)}
                        alt="Chosen thumbnail"
                      />
                    )}
                  </div>

                  <Grid
                    container
                    spacing={2}
                    sx={{ marginTop: "24px", flex: 1 }}
                  >
                    <Grid
                      item
                      xs={12}
                    >
                      <Input
                        name="name"
                        label={t("form.labels.title")}
                        validate={[required(t("form.validations.required"))]}
                        required
                        rows={3}
                        maxRows={3}
                        disabled={!!chosenImage}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <Input
                        name="alt"
                        label={t("form.labels.altText")}
                        validate={[required(t("form.validations.required"))]}
                        required
                        rows={3}
                        maxRows={3}
                        disabled={!!chosenImage}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <div className="details-section">
                        <h5>{t("common.details")}</h5>
                        {/* <div className="spec">
                          <span className="type">{t("common.version")}</span>
                          <span className="value"></span>
                        </div> */}
                        <div className="spec">
                          <span className="type">{t("common.size")}</span>
                          <span className="value">{chosenImage?.size || convertToSize(file?.size || 0)}</span>
                        </div>
                        {/* <div className="spec">
                          <span className="type">{t("common.location")}</span>
                          <span className="value"></span>
                        </div> */}
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginTop: "auto" }}
                    >
                      <div className="form-btns-wrapper">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          size="large"
                          sx={{
                            width: "auto",
                            mr: 1,
                          }}
                          disabled={invalid}
                        >
                          {t("common.save")}
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          size="large"
                          sx={{
                            width: "auto",
                            mr: 1,
                          }}
                          disabled={(file && !chosenImage) || (!file && !chosenImage)}
                          onClick={() => setImageDelete(true)}
                        >
                          {t("common.delete")}
                        </Button>
                        <Button
                          variant="text"
                          color="primary"
                          size="large"
                          sx={{
                            width: "auto",
                          }}
                          onClick={closeFn}
                        >
                          {t("common.cancel")}
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <div className="right-content">
                  <div className="inner-content">
                    <div className="img-wrapper select">
                      <div className="inner">
                        <IconPlus />
                        <span className="text-add">{t("common.add")}</span>
                        {inputRendered && (
                          <input
                            type="file"
                            accept=".png,.jpg"
                            onChange={(e) => {
                              setChosenImage(null);
                              resetInput();
                              setFile(e.target.files?.[0] || null);
                              form.mutators.setFormValue("image", e.target.files?.[0] || null);
                              form.mutators.setFieldTouched("image", true);
                              form.mutators.setFormValue("name", null);
                              form.mutators.setFormValue("alt", null);
                              form.mutators.setFieldTouched("name", false);
                              form.mutators.setFieldTouched("alt", false);
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {images.map((img: Image) => (
                      <div
                        className="img-wrapper"
                        key={img.id}
                        onClick={() => {
                          setFile(null);
                          resetInput();
                          setChosenImage({
                            id: img.id,
                            path: img.path,
                            name: img.name,
                            alt: img.alt,
                            size: img.size,
                          });
                          form.mutators.setFormValue("image", img.id || null);
                          form.mutators.setFormValue("imgPath", img.path || null);
                          form.mutators.setFormValue("name", img.name || null);
                          form.mutators.setFormValue("alt", img.id || null);
                          form.mutators.setFieldTouched("image", true);
                        }}
                      >
                        <div className="inner">
                          <LazyLoadImage
                            alt={img.alt}
                            src={img.path}
                            effect="opacity"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {imageDelete && (
                <Modal closeFn={() => setImageDelete(false)}>
                  <>
                    <IconTrash />
                    <h6>{t("common.deleteImage")}</h6>
                    <span>
                      <Trans
                        i18nKey="common.deleteImageQuestion"
                        tOptions={{ image: chosenImage?.name }}
                      >
                        <strong />
                      </Trans>
                    </span>
                    <div className="btns-wrapper">
                      <Button
                        variant="contained"
                        color="error"
                        type="submit"
                        size="large"
                        onClick={() => {
                          deleteImage.mutate(() => {
                            form.restart();
                            form.mutators.setFormValue("name", null);
                            form.mutators.setFormValue("alt", null);
                            form.mutators.setFieldTouched("name", false);
                            form.mutators.setFieldTouched("alt", false);
                          });
                        }}
                      >
                        {t("common.delete")}
                      </Button>
                      <Button
                        variant="contained"
                        color="info"
                        type="submit"
                        size="large"
                        onClick={() => setImageDelete(false)}
                      >
                        {t("common.cancel")}
                      </Button>
                    </div>
                  </>
                </Modal>
              )}
            </form>
          )}
        />
      </Content>
    </>
  );
};

export default ImagePicker;
