import { BLACK_COLOR, WHITE_COLOR, getNewGuid } from './app.model';
import { ComponentType, IGrid, IMenuItem, IRow, IBlockComponent, IBaseComponent, IImageComponent } from './site.model';

export const getMenuItem = (): IMenuItem => <IMenuItem>{
  id: getNewGuid(),
  title: 'New Page',
  rowItems: [
    getRow(),
  ],
};

export const getBaseComponent = (type: ComponentType): IBaseComponent => <IBaseComponent> {
  id: getNewGuid(),
  type: type,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  backgroundColor: WHITE_COLOR,
  borderWidth: 0,
  borderStyle: 'hidden',
  borderColor: BLACK_COLOR,
  borderRadius: 0,
};

export const getGrid = (): IGrid => <IGrid>{
  ...getBaseComponent(ComponentType.Grid),
  components: [],
};

export const getRow = (): IRow => <IRow>{
  ...getBaseComponent(ComponentType.Row),
  gridItems: [getGrid()],
};

export const getBlockComponent = (): IBlockComponent => <IBlockComponent>{
  ...getBaseComponent(ComponentType.Block),
  text: 'Wprowadź tekst',
  backgroundColor: '#ffffff',
  fontSize: 12,
  fontFamily: 'sans-serif',
  fontColor: BLACK_COLOR,
  textAlign: 'center',
  verticalAlign: 'middle',
};

export const getImageComponent = (): IImageComponent => <IImageComponent>{
  ...getBaseComponent(ComponentType.Image),
  imgPath: 'https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg',
  backgroundColor: '#ffffff',
};
