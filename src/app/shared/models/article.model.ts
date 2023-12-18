import { NumericDictionary } from "lodash";

export interface IArticle {
  id: number;
  title: string;
  description: string;
  definition: any;
  category: string;
}

export interface IMicroArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
}

export interface IGetArticleTitlesDto {
  articlesIdToTitleMap: NumericDictionary<string>;
}

export interface ISaveArticle {
  title: string;
  description: string;
  definition: any;
  category: string;
}
