import React, { useState, useEffect, createRef } from "react";
import GridLayout from "react-grid-layout";
import { useTranslation, Trans } from "react-i18next";

//MUI components
import Grid from "@mui/material/Grid";

//custom components
import Category from "./Category.component";

//hooks
import useWindowSize from "../../../hooks/useWindowSize";
// import useAuth from "../../../hooks/useAuth";

const PageBegin: React.FC<{}> = () => {
  const [width, setWidth] = useState<number>(100);
  const [rowHeight, setRowHeight] = useState<number>(180);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const contentRef: any = createRef();

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1, isResizable: false, isBounded: true },
    { i: "b", x: 1, y: 0, w: 1, h: 1, isResizable: false, isBounded: true },
    { i: "c", x: 2, y: 0, w: 1, h: 1, isResizable: false, isBounded: true },
    { i: "d", x: 0, y: 0, w: 1, h: 1, isResizable: false, isBounded: true },
  ];

  useEffect(() => {
    if (contentRef.current && windowWidth && windowHeight) {
      setWidth(contentRef.current.offsetWidth);
      setRowHeight(Math.round(contentRef.current.offsetWidth / 3) - 25);
    }
  }, [contentRef?.current?.offsetWidth, windowWidth, windowHeight]);

  return (
    <div
      className="page-wrapper"
      ref={contentRef}
    >
      <GridLayout
        className="layout"
        layout={layout}
        cols={3}
        rowHeight={rowHeight}
        width={width}
        onLayoutChange={(newLayout) => console.log(newLayout)}
      >
        <div key="a">
          <Category isAdd />
        </div>
        <div key="b">
          <Category />
        </div>
        <div key="c">
          <Category />
        </div>
        <div key="d">
          <Category />
        </div>
      </GridLayout>
      {/* <Grid
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
      </Grid> */}
    </div>
  );
};

export default PageBegin;
