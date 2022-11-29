import React, { useEffect, createRef } from "react";

//custom components
import Category from "./Category.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";
// import useAuth from "../../../hooks/useAuth";

import { Draggable } from "react-drag-reorder";

const PageBegin: React.FC<{}> = () => {
  const contentRef: any = createRef();
  const { setTitle } = usePageTitle();

  const layout = [{}, {}, {}, {}, {}, {}];

  useEffect(() => {
    setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="page-wrapper"
      ref={contentRef}
    >
      <Category isAdd />
      <Draggable onPosChange={(currPos, newPos) => console.log(`${currPos} ${newPos}`)}>
        {layout.map((item, index) => {
          return <Category index={index} />;
        })}
      </Draggable>
    </div>
  );
};

export default PageBegin;
