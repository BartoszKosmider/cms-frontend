import { Subject } from "rxjs";
import { BLACK_COLOR, getNewGuid } from "./app.model";
import { getBaseComponent, getImageComponent } from './default-components.model';

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
  text: string;
  backgroundColor: string;
}

export interface IFooter extends IBaseComponent {
  text: string;
  backgroundColor: string;
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
}

export type GridComponentType = IBlockComponent | IImageComponent | IMicroArticleComponent | ITwitterComponent;

export interface IBlockComponent extends IBaseComponent, IBaseGridComponent {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontColor?: string;
  textAlign?: string;
  verticalAlign?: string;
}

export interface IImageComponent extends IBaseComponent, IBaseGridComponent {
  imgPath?: string;
  description?: string;
}

export interface IMicroArticleComponent extends IBaseComponent, IBaseGridComponent {
  articleId?: number;
  articleTitle?: string;
  articleChanged$?: Subject<number>;
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

