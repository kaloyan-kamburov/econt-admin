import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

//MUI components
import Button from "@mui/material/Button";

//custom components
import Loader from "../../../components/common/Loader/Loader.component";

//icons
import { IconArchive } from "../../../Icons/icons";

interface Props {
  groupForArchive: string;
  closeFn: () => void;
}

const ArchiveGroup: React.FC<Props> = ({ groupForArchive, closeFn }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <>
      <IconArchive />
      <h6>{t("pages.folder.archiveGroup")}</h6>
      <span>
        <Trans
          i18nKey="pages.folder.archiveGroupQuestion"
          tOptions={{ group: groupForArchive }}
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

export default ArchiveGroup;
