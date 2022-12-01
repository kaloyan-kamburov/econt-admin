import React, { useEffect, createRef, useState } from "react";
import { useMutation } from "react-query";
import axiosOrg, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Draggable } from "react-drag-reorder";
import { useTranslation } from "react-i18next";

//custom components
import Category from "./Category.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";
import useCategories from "../../../hooks/useCategories";

//utils
import axios from "../../../utils/api";

const PageBegin: React.FC<{}> = () => {
  const contentRef: any = createRef();
  const { t } = useTranslation();
  const { setTitle } = usePageTitle();
  const { categories, setCategories } = useCategories();
  const [categoriesRendered, setCategoriesRendered] = useState<boolean>(true);

  //save category
  const updatePositions = useMutation(
    async (values: any) => {
      await axios.put("categories/update", values);
      return values;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          setCategories(data);
          toast.success(`${t("pages.home.categoriesUpdated")}`);
        }
      },
      onError: (error: AxiosError) => {
        setCategories([...categories]);
        toast.error(error?.message || `${t("pages.login.loginError")}`);
      },
    }
  );

  useEffect(() => {
    setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories.length) {
      setCategoriesRendered(false);
      setTimeout(() => {
        setCategoriesRendered(true);
      }, 10);
    }
  }, [categories]);

  return (
    <div
      className="page-wrapper"
      ref={contentRef}
    >
      {/* {JSON.stringify(categories)} */}
      <Category isAdd />
      {categoriesRendered && (
        <Draggable
          onPosChange={(currPos, newPos) => {
            const newCategories = [...categories];
            const tempCategory = categories[currPos];
            newCategories[currPos] = newCategories[newPos];
            newCategories[newPos] = tempCategory;
            updatePositions.mutate(newCategories);
            // console.log(`${currPos} ${newPos}`);
          }}
        >
          {categories.map((item) => (
            <Category
              key={item.id}
              data={item}
              published={item.published}
            />
          ))}
        </Draggable>
      )}
    </div>
  );
};

export default PageBegin;
