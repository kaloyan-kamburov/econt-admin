import React from "react";
import styled from "styled-components";
import { useNavigate, Link, useLocation, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

//components
import Logo from "../Logo/Logo.component";

//MUI components
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

//hooks
import useCategories from "../../../hooks/useCategories";

//styles
import { bgHeaders } from "../../../styles/theme";

const SidebarWrapper = styled.aside`
  width: calc(47.4 * var(--atom));
  min-height: 100vh;
  background: ${bgHeaders};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
  padding: calc(3.4 * var(--atom)) calc(2.4 * var(--atom));

  .logo svg {
    max-width: calc(30.8 * var(--atom));
    max-height: calc(6.4 * var(--atom));
  }

  .accordion-wrapper {
    margin-top: calc(6.4 * var(--atom));
  }
`;

const Sidebar: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { categories } = useCategories();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <SidebarWrapper>
      <Link
        className="logo"
        to="/"
      >
        <Logo />
      </Link>
      <div className="accordion-wrapper">
        {/* {JSON.stringify(categories)} */}
        {categories.length ? (
          categories.map((cat) =>
            cat.folders?.length ? (
              <Accordion
                key={cat.id}
                defaultExpanded={pathname.indexOf(`/category/${cat.id}`) > -1}
              >
                <AccordionSummary
                  key={cat.id}
                  expandIcon={
                    <svg
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.5 1.02673L3.9927 4L7.5 1"
                        stroke="#212121"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  <span onClick={() => navigate(`/category/${cat.id}`)}>{cat.name}</span>
                </AccordionSummary>
                <AccordionDetails>
                  {cat.folders.map((folder: any) => (
                    <Accordion key={folder.id}>
                      <NavLink
                        to={`/category/${cat.id}/${folder.id}`}
                        className={() => (pathname === `/category/${cat.id}/${folder.id}` ? "active" : "")}
                      >
                        <AccordionSummary>
                          <span>{folder.name}</span>
                        </AccordionSummary>
                      </NavLink>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : (
              <AccordionSummary key={cat.id}>
                <span onClick={() => navigate(`/category/${cat.id}`)}>{cat.name}</span>
              </AccordionSummary>
            )
          )
        ) : (
          <span>{t("common.noCategories")}</span>
        )}
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
