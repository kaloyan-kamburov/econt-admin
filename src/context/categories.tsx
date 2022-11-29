import React, { createContext, useState } from "react";

type Category = any;

type CategoryContextType = {
  categories: Category[];
  setCategories: (category?: Category) => void;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  setCategories: () => {},
});

interface Props {
  children: JSX.Element;
}

export const useProvideCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  return {
    categories,
    setCategories,
  };
};

export const CategoriesProvider: React.FC<Props> = ({ children }) => {
  const categoriesData = useProvideCategories();
  return <CategoryContext.Provider value={categoriesData}>{children}</CategoryContext.Provider>;
};
