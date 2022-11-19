import { useContext } from "react";
import { PageTitleContext } from "../context/pageTitle";

const usePageTitle = () => useContext(PageTitleContext);

export default usePageTitle;
