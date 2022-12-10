import React, { useState } from "react";
import { useMutation } from "react-query";
import axiosOrg, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useTranslation, Trans } from "react-i18next";

//hooks
import { useCategories } from "../../../hooks/hooks";

//MUI components
import Button from "@mui/material/Button";

//custom components
import Loader from "../../../components/common/Loader/Loader.component";

//icons
import { IconUnpublish } from "../../../Icons/icons";

//utils
import axios from "../../../utils/api";

//types
import { TCategory } from "../../../context/categories";

interface Props {
  closeFn: () => void;
  categoryData: any;
}

const ArchiveFolder: React.FC<Props> = ({ categoryData, closeFn }) => {
  const { t } = useTranslation();
  const { categories, setCategories } = useCategories();
  const [loading] = useState<boolean>(false);

  const unpublishCategory = useMutation(
    async () => {
      const data = await axios.patch(`categories/${categoryData?.id}/publish`, {
        published: false,
      });
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          const updatedCategoryIndex = categories.findIndex(
            (cat: TCategory) => categoryData && cat.id === categoryData.id
          );
          if (updatedCategoryIndex) {
            const newCategories = [...categories];
            newCategories[updatedCategoryIndex].published = false;
            setCategories(newCategories);
          }
          closeFn();
          toast.success(`${t("pages.home.categoryPublished")}`);
        }
      },
      onError: () => {
        toast.error(`${t("common.errorPublishCategory")}`);
      },
    }
  );

  return (
    <>
      <IconUnpublish />
      <h6>{t("common.removeFromPublish")}</h6>
      <span>
        <Trans
          i18nKey="pages.category.unpublishFolderQuestion"
          tOptions={{ folder: categoryData?.["name:bg"] }}
        >
          <strong />
        </Trans>
      </span>
      <div className="btns-wrapper">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          onClick={() => unpublishCategory.mutate()}
        >
          {t("common.save")}
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
      {loading && (
        <Loader
          showExplicit
          inModal
        />
      )}
    </>
  );
};

export default ArchiveFolder;
