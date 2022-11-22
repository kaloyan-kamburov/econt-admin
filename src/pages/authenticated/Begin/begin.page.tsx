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
    { i: "a", x: 0, y: 0, w: 1, h: 1, isResizable: false, draggableHandle: ".drag-handle", isBounded: true, static: true },
    { i: "b", x: 1, y: 0, w: 1, h: 1, isResizable: false, draggableHandle: ".drag-handle", isBounded: true },
    { i: "c", x: 2, y: 0, w: 1, h: 1, isResizable: false, draggableHandle: ".drag-handle", isBounded: true },
    { i: "d", x: 3, y: 0, w: 1, h: 1, isResizable: false, draggableHandle: ".drag-handle", isBounded: true },
  ];

  useEffect(() => {
    if (contentRef.current && windowWidth && windowHeight) {
      setWidth(contentRef.current.offsetWidth);
      setRowHeight(Math.round(contentRef.current.offsetWidth / 4) - 25);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef?.current?.offsetWidth, windowWidth, windowHeight]);

  return (
    <div
      className="page-wrapper"
      ref={contentRef}
    >
      <GridLayout
        className="layout"
        layout={layout}
        // cols={windowWidth && windowWidth < 1200 ? 3 : 4}
        cols={4}
        rowHeight={rowHeight}
        width={width}
        onLayoutChange={(newLayout) => console.log(newLayout)}
        draggableHandle=".drag-handle"
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
