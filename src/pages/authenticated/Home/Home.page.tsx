import React, { useEffect, createRef } from "react";

//custom components
import Category from "./Category.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";
import useCategories from "../../../hooks/useCategories";

import { Draggable } from "react-drag-reorder";

const PageBegin: React.FC<{}> = () => {
  const contentRef: any = createRef();
  const { setTitle } = usePageTitle();
  const { categories, setCategories } = useCategories();

  // const layout = [{}, {}, {}, {}, {}, {}];

  useEffect(() => {
    setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="page-wrapper"
      ref={contentRef}
    >
      {/* {JSON.stringify(categories)} */}
      <Category isAdd />
      <Draggable onPosChange={(currPos, newPos) => console.log(`${currPos} ${newPos}`)}>
        {categories.map((item) => (
          <Category
            key={item.id}
            data={item}
            published={item.published}
          />
        ))}
      </Draggable>
    </div>
  );
};

export default PageBegin;
