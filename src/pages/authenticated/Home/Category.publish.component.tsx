import React from "react";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import axiosOrg, { AxiosError } from "axios";
import toast from "react-hot-toast";

//hooks
import { useCategories } from "../../../hooks/hooks";

//components
import PublishPreview from "../../../components/common/PublishPreview/PublishPreview.component";

//utils
import axios from "../../../utils/api";

//types
import { TCategory } from "../../../context/categories";

interface Props {
  closeFn: () => void;
  categoryData: any;
}

const CategoryPublish: React.FC<Props> = ({ closeFn, categoryData }) => {
  const { t } = useTranslation();
  const { categories, setCategories } = useCategories();

  const publishCategory = useMutation(
    async () => {
      const data = await axios.patch(`categories/${categoryData?.id}/publish`, {
        published: true,
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
            newCategories[updatedCategoryIndex].published = true;
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
    <PublishPreview
      closeFn={() => closeFn()}
      items={categories}
      publishItem={categoryData}
      publishFn={publishCategory.mutate}
    />
  );
};

export default CategoryPublish;
