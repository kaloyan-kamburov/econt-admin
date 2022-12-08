import React, { useEffect, useState } from "react";
import { Draggable } from "react-drag-reorder";
import { useQuery, useMutation } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

//custom components
import Folder from "./Folder.component";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";
import usePageError from "../../../hooks/usePageError";

//utils
import axios from "../../../utils/api";

//types
import { TFolder } from "../../../context/categories";
import { Path } from "../../../components/common/Breadcrumb/Breadcrumb.component";

interface Props {}

const PageCategory: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { setTitle } = usePageTitle();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { setVisibleError, setRetryFn, setErrorMsg } = usePageError();
  const [folders, setFolders] = useState<TFolder[]>([]);
  const [foldersRendered, setfoldersRendered] = useState<boolean>(true);
  const [path, setPath] = useState<Path[]>([])

  //save positions
  const updatePositions = useMutation(
    async (values: any) => {
      await axios.put("categories/update", values);
      return values;
    },
    {
      onSuccess: (data: AxiosError | any) => {
        if (!axiosOrg.isAxiosError(data)) {
          toast.success(`${t("common.positionsUpdated")}`);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || `${t("pages.login.loginError")}`);
      },
    }
  );

  //get category data
  const { refetch: getCategoryData } = useQuery(
    "getCategoryData",
    async () => {
      // setVisible(false);
      const data = await axios(`folders?include=category.image&filter[folder_id]=${id}`);
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setFolders(data?.data?.data || []);
          setTitle(data?.data?.path?.[0]?.name || "");
          setPath(data?.data?.path || [])
          // setTitle(data?.data?.data?.name);
          // setFolders(data?.data?.data?.folders);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error?.message || `${t("common.errorGettingData")}`);
        setVisibleError(true);
        setRetryFn({
          execute: getCategoryData,
        });
      },
    }
  );

  useEffect(() => {
    setFolders([]);
    getCategoryData();
    return () => setErrorMsg("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); 

  useEffect(() => {
    if (folders.length) {
      setfoldersRendered(false);
      setTimeout(() => {
        setfoldersRendered(true);
      }, 10);
    }
  }, [folders]);

  return (
    <div className="page-wrapper xxl">
      <Breadcrumb routePath={path} />
      <Folder isAdd />
      {foldersRendered && (
        <Draggable
          onPosChange={(currPos, newPos) => {
            updatePositions.mutate(true);
          }}
        >
          {folders.map((folder: any) => (
            <Folder
              key={folder.id}
              published={folder.published}
              data={folder}
            />
          ))}
        </Draggable>
      )}
    </div>
  );
};

export default PageCategory;
