import React, { useEffect, useState } from "react";
import { Draggable } from "react-drag-reorder";
import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import axiosOrg, { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

//custom components
import Folder from "./Folder.component";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb.component";

//hooks
import usePageTitle from "../../../hooks/usePageTitle";

//utils
import axios from "../../../utils/api";

interface Props {}

const PageCategory: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { setTitle } = usePageTitle();
  const { id } = useParams();
  const [folders, setFolders] = useState<any[]>([]);
  const [foldersRendered, setfoldersRendered] = useState<boolean>(true);

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
      const data = await axios(`categories/${id}`);
      return data;
    },
    {
      onSuccess: (data: AxiosResponse<any>) => {
        if (!axiosOrg.isAxiosError(data)) {
          setTitle(data?.data?.data?.name);
          setFolders(data?.data?.data?.folders);
        }
      },
      onError: (error: AxiosError) => {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    getCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Breadcrumb routePath={["Path1", "Path2", "Path3"]} />
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
