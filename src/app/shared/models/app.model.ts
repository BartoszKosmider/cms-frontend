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
