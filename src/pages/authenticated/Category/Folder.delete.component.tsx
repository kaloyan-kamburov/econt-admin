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
import { usePageError } from "../../../hooks/hooks";

//utils
import axios from "../../../utils/api";

interface Props {
  name: string;
  id: number | string;
  closeFn: (folderId?: string | number) => void;
}

const DeleteFolder: React.FC<Props> = ({ name, id, closeFn }) => {
  const { t } = useTranslation();
  const { setRetryFn, setVisibleError } = usePageError();

  //delete category
  const deleteFolder = useMutation(
    async () => {
      setRetryFn({
        execute: () => deleteFolder.mutate(),
      });
      const data = await axios.delete(`folders/${id}`);
      return data;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          toast.success(`${t("pages.category.folderDeleted")}`);
          closeFn(id);
        }
      },
      onError: () => {
        // setVisibleError(true);
      },
    }
  );

  return (
    <>
      <IconTrash />
      <h6>{t("pages.category.deleteFolder")}</h6>
      <span>
        <Trans
          i18nKey="pages.category.deleteFolderQuestion"
          tOptions={{ folder: name }}
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
          onClick={() => deleteFolder.mutate()}
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

export default DeleteFolder;
