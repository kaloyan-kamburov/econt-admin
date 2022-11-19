import React, { useEffect } from "react";

//MUI components
import Grid from "@mui/material/Grid";

//custom components
import Group from "./Group.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";

interface Props {}

const PageCategory: React.FC<Props> = () => {
  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle("Забравени предмети");
  }, []);
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
          <Group
            isAdd
            published
          />
        </Grid>
        <Grid
          item
          xl={2}
          lg={3}
          md={4}
          xs={12}
        >
          <Group
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
          <Group
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
          <Group
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
