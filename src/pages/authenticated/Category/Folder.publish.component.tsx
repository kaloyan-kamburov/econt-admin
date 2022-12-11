import React from "react";
import { useMutation } from "react-query";
import { useTranslation } from "react-i18next";
import axiosOrg, { AxiosError } from "axios";
import toast from "react-hot-toast";

//hooks
import { usePageError } from "../../../hooks/hooks";

//components
import PublishPreview from "../../../components/common/PublishPreview/PublishPreview.component";

//utils
import axios from "../../../utils/api";

//types
import { TFolder } from "../../../context/categories";

interface Props {
  closeFn: any;
  // closeFn: (editedFolderData?: TFolder, categoryId?: number | string) => void;
  folderData?: TFolder;
  folders?: any[];
}

const FolderPublish: React.FC<Props> = ({ closeFn, folderData, folders }) => {
  const { t } = useTranslation();
  const { setVisibleError, setRetryFn, setErrorMsg } = usePageError();

  const publishFolder = useMutation(
    async () => {
      const data = await axios.patch(`folders/${folderData?.id}/publish`, {
        published: true,
      });
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          closeFn({ ...(folderData || {}), published: true }, folderData?.category_id);
          toast.success(`${t("pages.category.folderPublished")}`);
        }
      },
      onError: () => {
        toast.error(`${t("common.errorPublishFolder")}`);
      },
    }
  );

  // const publishFolder = useMutation(
  //   async (newValues: TFolder) => {
  //     setRetryFn({
  //       execute: () => publishFolder.mutate(newValues),
  //     });
  //     const data = await axios.patch(
  //       `folders/${newValues?.id || folderData?.id}/publish`,
  //       {
  //         published: true,
  //       }
  //     );
  //     return { ...data, newValues };
  //   },
  //   {
  //     onSuccess: (data: AxiosError | any) => {
  //       if (!axiosOrg.isAxiosError(data)) {
  //         toast.success(`${t("pages.category.folderPublished")}`);
  //         const newValues = data?.newValues;

  //         if (newValues) {
  //           closeFn({ ...newValues, published: true }, folderData.category_id);
  //         }
  //       }
  //     },
  //     onError: () => {
  //       setErrorMsg(t("common.errorPublishCategory"));
  //       setVisibleError(true);
  //     },
  //   }
  // );

  return (
    <PublishPreview
      closeFn={() => closeFn()}
      items={folders}
      publishItem={folderData}
      publishFn={publishFolder.mutate}
    />
  );
};

export default FolderPublish;
