export interface ICategory {
  id: number;
  category: string;
}

export interface IGetCategories {
  categories: ICategory[];
}

export interface ISaveCategory {
  category: string;
}
