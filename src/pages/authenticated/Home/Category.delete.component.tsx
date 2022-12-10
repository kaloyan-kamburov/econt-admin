import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useMutation } from "react-query";
import axiosOrg, { AxiosError } from "axios";
import toast from "react-hot-toast";

//MUI components
import Button from "@mui/material/Button";

//icons
import { IconTrash } from "../../../Icons/icons";

//hooks
import useCategories from "../../../hooks/useCategories";

//utils
import axios from "../../../utils/api";

//types
import { TCategory } from "../../../context/categories";
interface Props {
  category: TCategory | null;
  closeFn: () => void;
}

const DeleteCategory: React.FC<Props> = ({ category, closeFn }) => {
  const { t } = useTranslation();
  const { categories, setCategories } = useCategories();

  //save category
  const deleteCategory = useMutation(
    async () => {
      const data = await axios.delete(`categories/${category?.id}`);
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          toast.success(`${t("pages.home.categoryDeleted")}`);
          setCategories(
            categories.filter((cat: TCategory) => cat.id !== category?.id)
          );
          closeFn();
        }
      },
      onError: (e: AxiosError<any>) => {
        toast.error(
          e.response?.data?.message || `${t("common.errorRemovingData")}`
        );
      },
    }
  );
  return (
    <>
      <IconTrash />
      <h6>{t("pages.home.deleteCategory")}</h6>
      <span>
        <Trans
          i18nKey="pages.home.deleteCategoryQuestion"
          tOptions={{ category: category?.["name:bg"] }}
        >
          <strong />
        </Trans>
      </span>
      <div className="btns-wrapper">
        <Button
          variant="contained"
          color="error"
          type="submit"
          size="large"
          onClick={() => deleteCategory.mutate()}
        >
          {t("common.delete")}
        </Button>
        <Button
          variant="contained"
          color="info"
          type="submit"
          size="large"
          onClick={() => closeFn()}
        >
          {t("common.cancel")}
        </Button>
      </div>
    </>
  );
};

export default DeleteCategory;
