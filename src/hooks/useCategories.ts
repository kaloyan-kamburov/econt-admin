import { useContext } from "react";
import { CategoryContext } from "../context/categories";

const useCategories = () => useContext(CategoryContext);

export default useCategories;
