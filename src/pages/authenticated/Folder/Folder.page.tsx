import React, { useEffect, useState } from "react";
import { Draggable } from "react-drag-reorder";
import { useQuery, useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

//MUI components
// import Grid from "@mui/material/Grid";

//custom components
import Group from "./Group.component";
import Folder from "../Category/Folder.component";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";

//utils
import axios from "../../../utils/api";

interface Props {}

const PageFolder: React.FC<Props> = () => {
  const { setTitle } = usePageTitle();
  const { pathname } = useLocation();

  const [pageData, setPageData] = useState<any>({});
  const [records, setRecords] = useState<any>([]);
  const [itemsRendered, setItemsRendered] = useState<boolean>(true);

  //get category data
  const { refetch: getPageData } = useQuery(
    "getPageData",
    async () => {
      const pathArr = pathname.split("/");
      const id = pathArr[pathArr.length - 1];
      const data = await axios(`page/${id}`);
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setTitle(data?.data?.data?.name);
          setPageData(data?.data?.data);
          setRecords(data?.data?.records || []);
        }
      },
      onError: (error: AxiosError) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    getPageData();
  }, []);

  useEffect(() => {
    if (records.length) {
      setItemsRendered(false);
      setTimeout(() => {
        setItemsRendered(true);
      }, 10);
    }
  }, [records]);

  return (
    <div className="page-wrapper xxl">
      <Breadcrumb routePath={["Path1", "Path2", "Path3"]} />
      {((Array.isArray(records) && records.length === 0) || pageData.isFolders) && <Folder isAdd />}
      {((Array.isArray(records) && records.length === 0) || !pageData.isFolders) && (
        <Group
          isAdd
          published
        />
      )}
      {pageData?.records?.length > 0 && (
        <Draggable
          onPosChange={(currPos, newPos) => {
            // updatePositions.mutate(true);
          }}
        ></Draggable>
      )}
    </div>
  );
};

export default PageFolder;
