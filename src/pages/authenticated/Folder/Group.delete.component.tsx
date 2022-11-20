import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

//MUI components
import Button from "@mui/material/Button";

//custom components
import Loader from "../../../components/common/Loader/Loader.component";

//icons
import { IconTrash } from "../../../Icons/icons";

interface Props {
  folder: string;
  closeFn: () => void;
}

const DeleteGroup: React.FC<Props> = ({ folder, closeFn }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <>
      <IconTrash />
      <h6>{t("pages.category.deleteFolder")}</h6>
      <span>
        <Trans
          i18nKey="pages.category.deleteFolderQuestion"
          tOptions={{ folder }}
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
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              closeFn();
            }, 1000);
          }}
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
      {loading && (
        <Loader
          showExplicit
          inModal
        />
      )}
    </>
  );
};

export default DeleteGroup;
