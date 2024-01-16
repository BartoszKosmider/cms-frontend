import { HttpErrorResponse } from '@angular/common/http';
import { Dictionary } from 'lodash';
import * as uuid from 'uuid';

export const trackByIndex = (index: number, item: any) => index;

export const getNewGuid = (): string => uuid.v4();

export const WHITE_COLOR = '#ffffff';
export const BLACK_COLOR = '#000000';

export const FontFamily = [
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'ui-serif',
  'ui-sans-serif',
  'ui-monospace',
  'ui-rounded',
  'emoji',
  'math',
  'fangsong',
];

export const BorderStyle = [
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
];

export const TextAlign = [
  'center',
  'left',
  'right',
  'justify',
];

export const VerticalAlign = [
  'baseline',
  'top',
  'middle',
  'bottom',
  'sub',
  'text-top'
];

export enum RowVerticalAlignment {
  Top = 'align-self-start',
  Middle = 'align-self-center',
  Bottom = 'align-self-end',
}

export enum RowHorizontalAlignment {
  Start = 'justify-content-start',
  Center = 'justify-content-center',
  End = 'justify-content-end',
}

export enum BackgroundPattern {
  ZebraStripes = 'cms-background-pattern-1',
  DoubleHorizontalColour = 'cms-background-pattern-2',
};

export interface IBaseDialogData {
  title: string;
  message?: string;
}

export interface IBaseQuestionDialogData {
  question: string;
}

export interface IErrorDialogData {
  error: HttpErrorResponse,
}

export interface IImageDialogData {
  image: string;
}

export interface IIdResponse {
  id: number;
}
export const ImagePathDictionary: Dictionary<string> = {
  'Block': 'assets/component-images/Block.png',
  'Image': 'assets/component-images/Image.png',
  'MicroArticle': 'assets/component-images/MicroArticle.png',
  'Twitter': 'assets/component-images/Twitter.png',
}

export const DATETIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';
export const DATE_FORMAT = 'DD-MM-YYYY';

export enum OrderBy {
  ASC = 'Ascending',
  DESC = 'Descending',
}
