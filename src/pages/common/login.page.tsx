import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Form } from "react-final-form";
import { useNavigate } from "react-router-dom";

//MUI components
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//validations
import { required } from "../../utils/validations/validations";

//custom components
import { bgForms } from "../../styles/theme";
import Logo from "../../components/common/Logo/Logo.component";
import Input from "../../components/form/Input/Input.component";

//hooks
import useAuth from "../../hooks/useAuth";

const LoginWrapper = styled.div`
  padding: 48px 20px;
  margin: auto;
  background: ${bgForms};
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 414px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  form {
    width: 100%;
  }
`;

interface Props {}

const PageLogin: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // navigate("/home");
    }
  }, [user]);

  return (
    <LoginWrapper>
      <Logo />
      <Form
        onSubmit={() => {}}
        initialValues={{}}
        render={({ handleSubmit, invalid, errors, values, form }) => (
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: "24px" }}>
              <Grid item xs={12}>
                <Input
                  name="name"
                  label={t("form.labels.mail")}
                  validate={[required(t("form.validations.required"))]}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  disabled={invalid}
                >
                  {t("form.labels.loginWithSSO")}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      />
    </LoginWrapper>
  );
};

export default PageLogin;
