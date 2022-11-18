import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

//MUI components
import Button from "@mui/material/Button";

//custom components
import Loader from "../../../components/common/Loader/Loader.component";

//icons
import { IconArchive } from "../../../Icons/icons";

interface Props {
  folderForArchive: string;
  closeFn: () => void;
}

const ArchiveFolder: React.FC<Props> = ({ folderForArchive, closeFn }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <>
      <IconArchive />
      <h6>{t("pages.category.archiveFolder")}</h6>
      <span>
        <Trans
          i18nKey="pages.category.archiveFolderQuestion"
          tOptions={{ folder: folderForArchive }}
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
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              closeFn();
            }, 1000);
          }}
        >
          {t("common.archive")}
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
