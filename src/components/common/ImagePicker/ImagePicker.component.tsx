import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//validations
import { required } from "../../../utils/validations/validations";

//custom components
import Input from "../../../components/form/Input/Input.component";

//temp img
import testImg from "../../../Icons/img.png";
import { IconPlus } from "../../../Icons/icons";

//styles
import { inputBorder, lightColor, btnContainedPrimaryBgColor } from "../../../styles/theme";

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
    max-height: 100%;
  }

  .left-content {
    width: 37.5%;
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
    width: 62.5%;
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

      .type {
        font-size: calc(3 * var(--atom));
        line-height: calc(5 * var(--atom));
        width: calc(25 * var(--atom));
      }
    }
  }
`;

interface Props {
  closeFn: () => void;
}

type Image = {
  id: string;
  url: string;
};

const ImagePicker: React.FC<Props> = ({ closeFn }) => {
  const { t } = useTranslation();
  const [images, setImages] = useState<any>([]);
  const [file, setFile] = useState<any>(null);
  const [chosenImage, setChosenImage] = useState<Image | null>(null);
  const [inputRendered, setInputRendered] = useState<boolean>(true);

  useEffect(() => {
    setImages([
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]);
  }, []);

  const resetInput = () => {
    setInputRendered(false);
    setTimeout(() => setInputRendered(true));
  };

  return (
    <Content>
      <Form
        onSubmit={() => {
          // setLoading(true);
          // setTimeout(() => {
          //   setLoading(false);
          //   closeFn();
          // }, 1000);
        }}
        render={({ handleSubmit, invalid, errors, values, form }) => (
          <form
            autoComplete="off"
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
          >
            <div className="inner-content">
              <div className="left-content">
                <div className="img-wrapper">
                  {(chosenImage || file) && (
                    <img
                      src={chosenImage ? chosenImage.url : URL.createObjectURL(file)}
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
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <Input
                      name="description"
                      label={t("form.labels.altText")}
                      // validate={[required(t("form.validations.required"))]}
                      // required
                      rows={3}
                      maxRows={3}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <div className="details-section">
                      <h5>{t("common.details")}</h5>
                      <div className="spec">
                        <span className="type">{t("common.version")}</span>
                        <span className="value"></span>
                      </div>
                      <div className="spec">
                        <span className="type">{t("common.size")}</span>
                        <span className="value"></span>
                      </div>
                      <div className="spec">
                        <span className="type">{t("common.location")}</span>
                        <span className="value"></span>
                      </div>
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
                        onClick={() => {}}
                        sx={{
                          width: "auto",
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
                        }}
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
                            setFile(e.target.files?.[0] || null);
                          }}
                        />
                      )}
                    </div>
                  </div>
                  {images.map((img: any) => (
                    <div
                      className="img-wrapper"
                      onClick={() => {
                        setFile(null);
                        resetInput();
                        setChosenImage({
                          id: "123",
                          url: "/static/media/img.aad8975d75fb896139ae.png",
                        });
                      }}
                    >
                      <div className="inner">
                        <img
                          src={testImg}
                          alt="img"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      />
    </Content>
  );
};

export default ImagePicker;
