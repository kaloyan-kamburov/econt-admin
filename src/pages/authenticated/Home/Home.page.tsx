import React, { useEffect, useState } from "react";
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
import usePageError from "../../../hooks/usePageError";

//utils
import axios from "../../../utils/api";

const PageHome: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { setTitle } = usePageTitle();
  const { setVisibleError, setRetryFn } = usePageError();
  const { categories, setCategories } = useCategories();
  const [categoriesRendered, setCategoriesRendered] = useState<boolean>(true);

  //update category positions
  const updatePositions = useMutation(
    async (values: { currPos: number; newPos: number; id: number | string }) => {
      const data = await axios.patch(`categories/${values?.id}/order`, {
        position: values.newPos + 1,
      });
      return { ...data, newPos: values.newPos, currPos: values.currPos };
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          const currPos = data?.currPos;
          const newPos = data?.newPos;
          const newCategories = [...categories];
          const tempCategory = newCategories.splice(currPos, 1)[0];
          newCategories.splice(newPos, 0, tempCategory);
          setCategories(newCategories);
          toast.success(`${t("common.positionsUpdated")}`);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || `${t("common.errorGettingData")}`);
        setVisibleError(true);
      },
    }
  );

  const reloadContent = () => {
    setCategoriesRendered(false);
    setTimeout(() => {
      setCategoriesRendered(true);
    }, 10);
  };

  useEffect(() => {
    setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (categories.length) {
      reloadContent();
    }
  }, [categories]);

  return (
    <>
      <div className="page-wrapper">
        <Category isAdd />
        {categoriesRendered && (
          <Draggable
            onPosChange={(currPos, newPos) => {
              const values = {
                newPos,
                currPos,
                id: categories?.[currPos]?.id || "",
              };
              updatePositions.mutate(values);
              setRetryFn({
                execute: () => updatePositions.mutate(values),
              });
            }}
          >
            {categories.map((item) => (
              <Category
                key={item.id}
                data={item}
                published={item.published}
                resetRender={() => reloadContent()}
              />
            ))}
          </Draggable>
        )}
      </div>
    </>
  );
};

export default PageHome;
