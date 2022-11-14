import React from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { bgHeaders } from "../../../styles/theme";

//MUI icons
import IconSearch from "@mui/icons-material/Search";

const HeaderWrapper = styled.header`
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: ${bgHeaders};
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const SearchInputWrapper = styled.div`
  width: 270px;
`;

const Header: React.FC<{}> = () => {
  const { t } = useTranslation();
  return (
    <HeaderWrapper>
      <div></div>
      <SearchInputWrapper>
        <TextField
          // InputProps={{
          //   startAdornment: <IconSearch />,
          // }}
          // InputLabelProps={{
          //   style: {
          //     paddingLeft: "20px",
          //   },
          // }}
          sx={{ width: "100%" }}
          size="medium"
          className="with-start-icon"
          label={t("form.labels.search")}
        />
      </SearchInputWrapper>
    </HeaderWrapper>
  );
};

export default Header;
