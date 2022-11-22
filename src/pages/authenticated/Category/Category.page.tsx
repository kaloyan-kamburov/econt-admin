import React, { useEffect, useState, createRef } from "react";
import GridLayout from "react-grid-layout";

//MUI components
import Grid from "@mui/material/Grid";

//custom components
import Folder from "./Folder.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";
import useWindowSize from "../../../hooks/useWindowSize";

interface Props {}

const PageCategory: React.FC<Props> = () => {
  const [width, setWidth] = useState<number>(100);
  const [rowHeight, setRowHeight] = useState<number>(180);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const contentRef: any = createRef();
  const { setTitle } = usePageTitle();

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 1, isResizable: false, draggableHandle: ".drag-handle", isBounded: true, static: true },
    { i: "b", x: 1, y: 0, w: 1, h: 1, isResizable: false, draggableHandle: ".drag-handle", isBounded: true },
    { i: "c", x: 2, y: 0, w: 1, h: 1, isResizable: false, draggableHandle: ".drag-handle", isBounded: true },
    { i: "d", x: 3, y: 0, w: 1, h: 1, isResizable: false, draggableHandle: ".drag-handle", isBounded: true },
  ];

  useEffect(() => {
    setTitle("Услуги от България");
  }, []);

  useEffect(() => {
    if (contentRef.current && windowWidth && windowHeight) {
      setWidth(contentRef.current.offsetWidth);
      setRowHeight(Math.round(contentRef.current.offsetWidth / 5));
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
        cols={5}
        rowHeight={rowHeight}
        width={width}
        onLayoutChange={(newLayout) => console.log(newLayout)}
        draggableHandle=".drag-handle"
      >
        <div key="a">
          <Folder isAdd />
        </div>
        <div key="b">
          <Folder
            title="Куриерски пратки"
            published
          />
        </div>
        <div key="c">
          <Folder
            title="Куриерски пратки"
            published={false}
          />
        </div>
        <div key="d">
          <Folder
            title="Куриерски пратки"
            published
          />
        </div>
      </GridLayout>
    </div>
  );
};

export default PageCategory;
