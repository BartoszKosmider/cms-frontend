import { Subject } from 'rxjs';
import { BLACK_COLOR, RowVerticalAlignment, WHITE_COLOR, getNewGuid, RowHorizontalAlignment } from './app.model';
import { ComponentType, IGrid, IMenuItem, IRow, IBlockComponent, IBaseComponent, IImageComponent, IMicroArticleComponent, ITwitterComponent } from './site.model';

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
  enableBackgroundColor: false,
  backgroundColor: WHITE_COLOR,
  borderWidth: 0,
  borderStyle: 'hidden',
  borderColor: BLACK_COLOR,
  borderRadius: 0,
  // width: 100,
  // height: 100,
};

export const getGrid = (): IGrid => <IGrid>{
  ...getBaseComponent(ComponentType.Grid),
  components: [],
  width: 12,
  widthMobile: 12,
};

export const getRow = (): IRow => <IRow>{
  ...getBaseComponent(ComponentType.Row),
  gridItems: [getGrid()],
  verticalAlignment: RowVerticalAlignment.Top,
  horizontalAlignment: RowHorizontalAlignment.Start,
};

export const getBlockComponent = (): IBlockComponent => <IBlockComponent>{
  ...getBaseComponent(ComponentType.Block),
  text: 'Wprowadź tekst',
  enableBackgroundColor: true,
  backgroundColor: WHITE_COLOR,
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

export const getMicroArticleComponent = (): IMicroArticleComponent => <IMicroArticleComponent>{
  ...getBaseComponent(ComponentType.MicroArticle),
  articleId: undefined,
  articleChanged$: new Subject<number>(),
  enableBackgroundColor: true,
  backgroundColor: WHITE_COLOR,
};

export const getTwitterComponent = (): ITwitterComponent => <ITwitterComponent>{
  ...getBaseComponent(ComponentType.Twitter),
  twitterPostHtml: 'dupa',
  enableBackgroundColor: true,
  backgroundColor: WHITE_COLOR,
};
