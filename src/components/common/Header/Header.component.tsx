import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { bgHeaders, linkColor } from "../../../styles/theme";

//MUI icons
import IconSearch from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";

//context
import usePageTitle from "../../../hooks/usePageTitle";

const HeaderWrapper = styled.header`
  top: 0;
  left: 0;
  width: 100%;
  height: calc(14 * var(--atom));
  background: ${bgHeaders};
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(4 * var(--atom));
  z-index: 2;
`;

const SearchInputWrapper = styled.div`
  width: calc(70 * var(--atom));
  display: flex;
  align-items: center;
  position: relative;

  .icon-search {
    position: absolute;
    z-index: 2;
    left: calc(2 * var(--atom));
    top: calc(2 * var(--atom));
  }

  label {
    padding-left: calc(6 * var(--atom));
  }

  .Mui-focused {
    label {
      padding-left: 0;
    }
  }

  input {
    padding-left: calc(7 * var(--atom)) !important;
  }
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
        <IconSearch className="icon-search" />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: "Услуги от България" }]}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              // InputProps={{
              //   startAdornment: <IconSearch />,
              // }}
              label={t("form.labels.search")}
              className="with-start-icon"
              size="small"
            />
          )}
        />
      </SearchInputWrapper>
    </HeaderWrapper>
  );
};

export default Header;
