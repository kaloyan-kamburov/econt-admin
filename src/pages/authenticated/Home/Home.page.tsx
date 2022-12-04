import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import axiosOrg, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Draggable } from "react-drag-reorder";
import { useTranslation } from "react-i18next";

//custom components
import Category from "./Category.component";
import PageError from "../../../components/common/PageError/pageError.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";
import useCategories from "../../../hooks/useCategories";
import usePageError from "../../../hooks/usePageError";

//utils
import axios from "../../../utils/api";

const PageHome: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { setTitle } = usePageTitle();
  const { setVisibleError, setRetryFn } = usePageError();
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
          toast.success(`${t("common.categoriesUpdated")}`);
        }
      },
      onError: (error: AxiosError) => {
        setCategories([...categories]);
        toast.error(error?.message || `${t("common.errorGettingData")}`);
        setVisibleError(true);
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
    <>
      <div className="page-wrapper">
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
              setRetryFn({
                execute: () => updatePositions.mutate(newCategories),
              });
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
    </>
  );
};

export default PageHome;
