import React from "react";

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
          <Folder isAdd />
        </Grid>
        <Grid
          item
          xl={2}
          lg={3}
          md={4}
          xs={12}
        >
          <Folder
            archived={false}
            published
            title="Населени места"
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
            archived={false}
            published={false}
            title="Населени места"
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
            archived
            title="Куриерски пратки"
            published
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PageCategory;
