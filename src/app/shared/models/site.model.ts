export interface ISite {
  menuItems: IMenuItem[];
  header: IHeader;
  footer: IFooter;
}

export interface IMenuItem {
  id: string | undefined;
  title: string;
  rowItems: IRow[];
}

export interface IHeader extends IBaseComponent {
  title: string;
}

export interface IFooter extends IBaseComponent {
  rowItems: IRow[];
}

export interface IRow extends IBaseComponent {
  id: string;
  gridItems: IGrid[];
  horizontalAlignment: string;
  verticalAlignment: string;
}

export interface IGrid extends IBaseComponent {
  components: GridComponentType[];
  width: number;
  widthMobile: number;
}

export type GridComponentType = IBlockComponent | IImageComponent | IMicroArticleComponent | ITwitterComponent;

export interface IBlockComponent extends IBaseComponent, IBaseGridComponent {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  textAlign?: string;
  verticalAlign?: string;
  link?: string;
}

export interface IImageComponent extends IBaseComponent, IBaseGridComponent {
  imgPath?: string;
}

export interface IMicroArticleComponent extends IBaseComponent, IBaseGridComponent {
  articleId?: number;
  articleTitle?: string;
}

export interface ITwitterComponent extends IBaseComponent, IBaseGridComponent {
  twitterPostHtml?: string;
}

export interface IBaseGridComponent {
}

export interface IBaseComponent {
  type: ComponentType;
  id: string;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  enableBackgroundColor: boolean;
  backgroundColor: string;
  enableBackgroundPattern: boolean;
  backgroundPattern: string;
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
  borderRadius: number;
  // width: number;
  // height: number;
}

export enum ComponentType {
  Header = 'Header',
  Footer = 'Footer',
  Row = 'Row',
  Grid = 'Grid',
  Block = 'Block',
  Image = 'Image',
  MicroArticle = 'MicroArticle',
  Twitter = 'Twitter',
}

export interface ISaveSite {
  site: ISite;
}

export interface IGetSite {
  site: ISite;
}

