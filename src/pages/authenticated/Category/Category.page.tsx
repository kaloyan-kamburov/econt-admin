import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation, Trans } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";

//custom components
import Folder from "./Folder.component";

interface Props {}

const PageCategory: React.FC<Props> = () => {
  return (
    <>
      <Grid
        container
        spacing={3}
        columns={10}
      >
        <Grid
          item
          xl={2}
          lg={3}
          md={4}
          xs={12}
        >
          <Folder
            isAdd
            addItem={() => {}}
          />
        </Grid>
        <Grid
          item
          xl={2}
          lg={3}
          md={4}
          xs={12}
        >
          <Folder
            addItem={() => {}}
            title="Населени места"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PageCategory;
