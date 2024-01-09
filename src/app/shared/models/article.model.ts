import { NumericDictionary } from "lodash";

export interface IArticle {
  id: number;
  title: string;
  description: string;
  definition: any;
  categoryId: number;
  isLiked: boolean;
}

export interface IMicroArticle {
  id: number;
  title: string;
  description: string;
  categoryId: number;
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
  categoryId: number;
  isLiked: boolean;
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

export interface IGetMicroArticlesList {
  articles: IMicroArticle[];
}

export enum SortingType {
  NameDescending = 'NDesc',
  NameAscending = 'NAsc',
  TimeDescending = 'NTDesc',
  TimeAscending = 'TAsc',
  LikeDescending = 'LDesc',
  LikeAscending = 'LAsc',
}

export enum ArticleFilterOption {
  Like = 'Like',
  Name = 'Name',
  Time = 'Time',
}
