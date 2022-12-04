import { useContext } from "react";
import { PageErrorContext } from "../context/pageError";

const usePageError = () => useContext(PageErrorContext);

export default usePageError;
