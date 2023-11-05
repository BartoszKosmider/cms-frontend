import { BLACK_COLOR, getNewGuid } from "./app.model";
import { getBaseComponent } from './default-components.model';

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
}

export interface IGrid extends IBaseComponent {
  components: GridComponentType[];
}

export type GridComponentType = IBlockComponent | IImageComponent;

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
  backgroundColor: string;
  borderWidth: number;
  borderStyle: string;
  borderColor: string;
  borderRadius: number;
}

export enum ComponentType {
  Header = 'Header',
  Footer = 'Footer',
  Row = 'Row',
  Grid = 'Grid',
  Block = 'Block',
  Image = 'Image',
}

export const siteTest: ISite = {
  header: {
    ...getBaseComponent(ComponentType.Header),
    text: 'cms projekt header',
    backgroundColor: '#123123',
  },
  footer: {
    ...getBaseComponent(ComponentType.Footer),
    text: 'cms projekt footer',
    backgroundColor: '#101010',
  },
  menuItems: [
    {
      id: getNewGuid(),
      title: 'test title',
      rowItems: [
        {
          ...getBaseComponent(ComponentType.Row),
          gridItems: [
            {
              ...getBaseComponent(ComponentType.Grid),
              components: [
                <IBlockComponent>{
                  ...getBaseComponent(ComponentType.Block),
                  backgroundColor: '#FF0000',
                  text: 'test text 1',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  fontColor: BLACK_COLOR,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              ],
            },
            {
              ...getBaseComponent(ComponentType.Grid),
              components: [
                <IBlockComponent>{
                  ...getBaseComponent(ComponentType.Block),
                  backgroundColor: '#0000FF',
                  text: 'test text 2',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  fontColor: BLACK_COLOR,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: getNewGuid(),
      title: 'About us 1',
      rowItems: [],
    },
    {
      id: getNewGuid(),
      title: 'About us 2',
      rowItems: [],
    },
    {
      id: getNewGuid(),
      title: 'About us 3',
      rowItems: [
        {
          ...getBaseComponent(ComponentType.Row),
          gridItems: [
            {
              ...getBaseComponent(ComponentType.Grid),
              components: [
                <IBlockComponent>{
                  ...getBaseComponent(ComponentType.Block),
                  backgroundColor: '#aaaaaa',
                  text: 'test text 1',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  fontColor: BLACK_COLOR,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              ],
            },
            {
              ...getBaseComponent(ComponentType.Grid),
              components: [
                <IBlockComponent>{
                  ...getBaseComponent(ComponentType.Block),
                  backgroundColor: '#321321',
                  text: 'test text 2',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  fontColor: BLACK_COLOR,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              ],
            },
            {
              ...getBaseComponent(ComponentType.Grid),
              components: [
                <IBlockComponent>{
                  ...getBaseComponent(ComponentType.Block),
                  backgroundColor: '#123123',
                  text: 'test text 2',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  fontColor: BLACK_COLOR,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              ],
            },
          ],
        },
        {
          ...getBaseComponent(ComponentType.Row),
          gridItems: [
            {
              ...getBaseComponent(ComponentType.Grid),
              components: [
                <IBlockComponent>{
                  ...getBaseComponent(ComponentType.Block),
                  backgroundColor: '#aaaaaa',
                  text: 'test text 1',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  fontColor: BLACK_COLOR,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              ],
            },
            {
              ...getBaseComponent(ComponentType.Grid),
              components: [
                <IBlockComponent>{
                  ...getBaseComponent(ComponentType.Block),
                  backgroundColor: '#321321',
                  text: 'test text 2',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  fontColor: BLACK_COLOR,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              ],
            },
            {
              ...getBaseComponent(ComponentType.Grid),
              components: [
                <IBlockComponent>{
                  ...getBaseComponent(ComponentType.Block),
                  backgroundColor: '#123123',
                  text: 'test text 2',
                  fontSize: 12,
                  fontFamily: 'sans-serif',
                  fontColor: BLACK_COLOR,
                  textAlign: 'center',
                  verticalAlign: 'middle',
                },
              ],
            },
          ],
        },
      ],
    },
  ]
}
