import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { bgHeaders, linkColor } from "../../../styles/theme";

//MUI icons
import IconSearch from "@mui/icons-material/Search";

//context
import usePageTitle from "../../../hooks/usePageTitle";

const HeaderWrapper = styled.header`
  top: 0;
  left: 0;
  width: 100%;
  height: calc(12.8 * var(--atom));
  background: ${bgHeaders};
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(4 * var(--atom));
`;

const SearchInputWrapper = styled.div`
  width: calc(54 * var(--atom));
`;

const TitleWrapper = styled.div`
  color: ${linkColor};
  font-weight: 600;
  font-size: calc(4 * var(--atom));
  line-height: calc(5.4 * var(--atom));
`;

const Header: React.FC<{}> = () => {
  const { t } = useTranslation();
  const { title } = usePageTitle();
  return (
    <HeaderWrapper>
      <TitleWrapper>{title}</TitleWrapper>
      <SearchInputWrapper>
        <TextField
          InputProps={{
            startAdornment: <IconSearch />,
          }}
          // InputLabelProps={{
          //   style: {
          //     paddingLeft: "20px",
          //   },
          // }}
          sx={{ width: "100%" }}
          size="small"
          className="with-start-icon"
          label={t("form.labels.search")}
        />
      </SearchInputWrapper>
    </HeaderWrapper>
  );
};

export default Header;
