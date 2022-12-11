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

interface Props {
  closeFn: any;
  folderData: any;
}

const UnpublishFolder: React.FC<Props> = ({ folderData, closeFn }) => {
  const { t } = useTranslation();
  const [loading] = useState<boolean>(false);

  const unpublishCategory = useMutation(
    async () => {
      const data = await axios.patch(`folders/${folderData?.id}/publish`, {
        published: false,
      });
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          closeFn({ ...(folderData || {}), published: false }, folderData?.category_id);
          toast.success(`${t("pages.category.folderPublished")}`);
        }
      },
      onError: () => {
        toast.error(`${t("common.errorPublishFolder")}`);
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
          tOptions={{ folder: folderData?.["name:bg"] }}
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

export default UnpublishFolder;
