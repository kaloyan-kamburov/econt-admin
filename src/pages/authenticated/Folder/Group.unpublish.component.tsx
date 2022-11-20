import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";

//MUI components
import Button from "@mui/material/Button";

//custom components
import Loader from "../../../components/common/Loader/Loader.component";

//icons
import { IconUnpublish } from "../../../Icons/icons";

interface Props {
  closeFn: () => void;
  group: any;
}

const ArchiveFolder: React.FC<Props> = ({ group, closeFn }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  return (
    <>
      <IconUnpublish />
      <h6>{t("common.removeFromPublish")}</h6>
      <span>
        <Trans
          i18nKey="pages.folder.unpublishGroupQuestion"
          tOptions={{ group: "asd" }}
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
