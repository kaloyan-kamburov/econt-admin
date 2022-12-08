import React, { createContext, useState } from "react";



export type TFolder = {
  id: string | number;
  "name:bg": string;
  "description:bg": string;
  category_id: string | number;
  parent_id:  string | number | null;
  published: boolean;
  order: number;
  created_at: string
  image: {
    alt: string;
    extension: string;
    id: string | number;
    path: string;
    size: string;
  };
  image_id: string | number;
}

export type TCategory = {
  "name:bg": string;
  "description:bg": string;
  created_at: string;
  id: string | number;
  folders: TFolder[],
  image: {
    alt: string;
    extension: string;
    id: string | number;
    path: string;
    size: string;
  };
  image_id: string | number;
  order: number;
  published: boolean;
};

type CategoryContextType = {
  categories: TCategory[];
  setCategories: React.Dispatch<React.SetStateAction<TCategory[]>>;
};

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  setCategories: () => {},
});

interface Props {
  children: JSX.Element;
}

export const useProvideCategories = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);

  return {
    categories,
    setCategories,
  };
};

export const CategoriesProvider: React.FC<Props> = ({ children }) => {
  const categoriesData = useProvideCategories();
  return <CategoryContext.Provider value={categoriesData}>{children}</CategoryContext.Provider>;
};
