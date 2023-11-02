import { getNewGuid } from './app.model';
import { ComponentType, IGrid, IMenuItem, IRow, IBlockComponent } from './site.model';

export const MENU_DEFAULT = <IMenuItem> {
  id: undefined,
  title: '',
  rowItems: [],
};

export const getGrid = (): IGrid => <IGrid>{
  id: getNewGuid(),
  type: ComponentType.Grid,
  components: [],
};

export const getRow = (): IRow => <IRow>{
  id: getNewGuid(),
  type: ComponentType.Row,
  gridItems: [getGrid()],
};

export const getBlockComponent = (): IBlockComponent => <IBlockComponent>{
  id: getNewGuid(),
  type: ComponentType.Block,
  text: 'Wprowadź tekst',
  backgroundColor: '#ffffff',
};
