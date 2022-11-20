import React from "react";
import { useTranslation, Trans } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";

//custom components
import Category from "./Category.component";

//hooks
// import useAuth from "../../../hooks/useAuth";

const PageBegin: React.FC<{}> = () => {
  return (
    <>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xl={3}
          lg={4}
          md={6}
          xs={12}
        >
          <Category isAdd />
        </Grid>
        <Grid
          item
          xl={3}
          lg={4}
          md={6}
          xs={12}
        >
          <Category />
        </Grid>
        <Grid
          item
          xl={3}
          lg={4}
          md={6}
          xs={12}
        >
          <Category />
        </Grid>
        <Grid
          item
          xl={3}
          lg={4}
          md={6}
          xs={12}
        >
          <Category />
        </Grid>
      </Grid>
    </>
  );
};

export default PageBegin;
