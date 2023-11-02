import { getNewGuid } from "./app.model";

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
}

export interface IImageComponent extends IBaseComponent, IBaseGridComponent {
  imgPath?: string;
}

export interface IBaseGridComponent {
  backgroundColor: string;
}

export interface IBaseComponent {
  type: ComponentType;
  id: string;
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
    id: getNewGuid(),
    type: ComponentType.Header,
    text: 'cms projekt header',
    backgroundColor: '#123123',
  },
  footer: {
    id: getNewGuid(),
    type: ComponentType.Footer,
    text: 'cms projekt footer',
    backgroundColor: '#101010',
  },
  menuItems: [
    {
      id: getNewGuid(),
      title: 'test title',
      rowItems: [
        {
          type: ComponentType.Row,
          id: getNewGuid(),          gridItems: [
            {
              id: getNewGuid(),
              type: ComponentType.Grid,
              components: [
                <IBlockComponent>{
                  id: getNewGuid(),
                  backgroundColor: '#FF0000',
                  text: 'test text 1',
                  type: ComponentType.Block,
                },
              ],
            },
            {
              id: getNewGuid(),
              type: ComponentType.Grid,
              components: [
                <IBlockComponent>{
                  id: getNewGuid(),
                  backgroundColor: '#0000FF',
                  text: 'test text 2',
                  type: ComponentType.Block,
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
          type: ComponentType.Row,
          id: getNewGuid(),
          gridItems: [
            {
              id: getNewGuid(),
              type: ComponentType.Grid,
              components: [
                <IBlockComponent>{
                  id: getNewGuid(),
                  backgroundColor: '#aaaaaa',
                  text: 'test text 1',
                  type: ComponentType.Block,
                },
              ],
            },
            {
              id: getNewGuid(),
              type: ComponentType.Grid,
              components: [
                <IBlockComponent>{
                  id: getNewGuid(),
                  backgroundColor: '#321321',
                  text: 'test text 2',
                  type: ComponentType.Block,
                },
              ],
            },
            {
              type: ComponentType.Grid,
              id: getNewGuid(),
              components: [
                <IBlockComponent>{
                  id: getNewGuid(),
                  backgroundColor: '#123123',
                  text: 'test text 2',
                  type: ComponentType.Block,
                },
              ],
            },
          ],
        },
        {
          type: ComponentType.Row,
          id: getNewGuid(),
          gridItems: [
            {
              id: getNewGuid(),
              type: ComponentType.Grid,
              components: [
                <IBlockComponent>{
                  id: getNewGuid(),
                  backgroundColor: '#aaaaaa',
                  text: 'test text 1',
                  type: ComponentType.Block,
                },
              ],
            },
            {
              type: ComponentType.Grid,
              id: getNewGuid(),
              components: [
                <IBlockComponent>{
                  id: getNewGuid(),
                  backgroundColor: '#321321',
                  text: 'test text 2',
                  type: ComponentType.Block,
                },
              ],
            },
            {
              id: getNewGuid(),
              type: ComponentType.Grid,
              components: [
                <IBlockComponent>{
                  id: getNewGuid(),
                  backgroundColor: '#123123',
                  text: 'test text 2',
                  type: ComponentType.Block,
                },
              ],
            },
          ],
        },
      ],
    },
  ]
}
