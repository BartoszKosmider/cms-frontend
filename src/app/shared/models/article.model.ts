import { NumericDictionary } from "lodash";

export interface IArticle {
  id: number;
  title: string;
  description: string;
  definition: any;
  categoryId: number;
}

export interface IMicroArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  authorId: string;
}

export interface IGetArticleTitlesDto {
  articlesIdToTitleMap: NumericDictionary<string>;
}

export interface ISaveArticle {
  title: string;
  description: string;
  contents: string;
  categoryId: number;
}

export interface IGetArticle {
  id: number;
  title: string;
  description: string;
  contents: string;
}

export interface IComment {
  id: number;
  content: string;
  authorId: string;
  authorName: string;
}

export interface ISaveArticleComment {
  content: string;
}
