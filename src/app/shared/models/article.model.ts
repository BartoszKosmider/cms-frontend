import { NumericDictionary } from "lodash";

export interface IArticle {
  id: number;
  title: string;
  description: string;
  definition: any;
  categoryId: number;
  isLiked: boolean;
  likeCount: number;
  authorName: string;
}

export interface IMicroArticle {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  createdAt: string;
  authorId: string;
  authorName: string;
  likeCount: number;
}

export interface IGetArticleTitlesDto {
  articles: IArticleIdTitle[];
}

export interface IArticleIdTitle {
  id: number,
  title: string;
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
  likeCount: number;
  autorName: string;
}

export interface IComment {
  id: number;
  contents: string;
  author: string;
}

export interface IGetComments {
  commentList: IComment[];
}

export interface ISaveArticleComment {
  contents: string;
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
