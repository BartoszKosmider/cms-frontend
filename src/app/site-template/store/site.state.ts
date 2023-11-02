import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, createSelector } from "@ngxs/store";
import { ISite, siteTest, IMenuItem, IBaseComponent, IHeader, IFooter, IRow, ComponentType } from '../../shared/models/site.model';
import { AddNewRow, GetSite, SetComponentToEdit, SetPageId, UpdateRowColumns } from './site.actions';
import { append, iif, patch, updateItem } from "@ngxs/store/operators";
import { produce } from "immer";
import { getGrid, getRow } from '../../shared/models/default-components.model';
import * as _ from "lodash";

export interface ISiteState {
  site: ISite;
  pageId?: string;
  componentToEdit?: IBaseComponent;
}

@State<ISiteState>({
  name: 'SiteState',
  defaults: {
    site: siteTest,
  },
})
@Injectable()
export class SiteState {
  public constructor() { }

  @Selector()
  public static site(state: ISiteState): ISite {
    return state.site;
  }

  @Selector()
  public static header(state: ISiteState): IHeader {
    return state.site.header;
  }

  @Selector()
  public static footer(state: ISiteState): IFooter {
    return state.site.footer;
  }

  @Selector()
  public static pageId(state: ISiteState): string {
    return state.pageId ?? '1';
  }

  @Selector()
  public static isRowSelected(state: ISiteState): boolean {
    return state.componentToEdit?.type === ComponentType.Row;
  }

  public static mainPage(pageId: string): (state: ISiteState) => IMenuItem | undefined {
    return createSelector([SiteState], (state: ISiteState) => {
      return state.site.menuItems.find(mi => mi.id === pageId);
    });
  }

  @Selector()
  public static menuItems(state: ISiteState): IMenuItem[] {
    return state.site.menuItems;
  }

  @Selector()
  public static componentToEdit(state: ISiteState): IBaseComponent | undefined {
    return state.componentToEdit;
  }

  @Action(GetSite)
  public getSite(ctx: StateContext<ISiteState>, action: GetSite): void {
    // todo
    // ctx.patchState({
    //   site: {},
    // });
  }

  @Action(SetPageId)
  public setMain(ctx: StateContext<ISiteState>, { pageId }: SetPageId): void {
    ctx.patchState({
      pageId: pageId,
    });
  }

  @Action(SetComponentToEdit)
  public setComponentToEdit(ctx: StateContext<ISiteState>, {component}: SetComponentToEdit): void {
    ctx.patchState({
      componentToEdit: component,
    });
  }

  @Action(AddNewRow)
  public addNewRow(ctx: StateContext<ISiteState>, {pageId}: AddNewRow): void {
    ctx.setState(patch<ISiteState>({
      site: patch({
        menuItems: updateItem<IMenuItem>(mi => mi.id === pageId, patch({
          rowItems: append<IRow>([getRow()]),
        })),
      }),
    }));
  }

  @Action(UpdateRowColumns)
  public updateRowColumns(ctx: StateContext<ISiteState>, {rowId, numberOfColumns}: UpdateRowColumns) {
    const currentState = ctx.getState();
    const pageId = SiteState.pageId(currentState);
    const mainPage = SiteState.mainPage(pageId)(currentState);
    const row =  mainPage?.rowItems.find(r => r.id === rowId);
    const currentNumberOfColumns = row?.gridItems.length;

    if (_.isNil(currentNumberOfColumns)) {
      return;
    }

    if (currentNumberOfColumns < numberOfColumns) {
      for (let index = 0; index < (numberOfColumns - currentNumberOfColumns); index++) {
        row?.gridItems.push(getGrid());
      }
    } else {
      for (let index = 0; index < (currentNumberOfColumns - numberOfColumns); index++) {
        row?.gridItems.pop();
      }
    }

    ctx.setState(patch<ISiteState>({
      site: patch({
        menuItems: updateItem<IMenuItem>(mi => mi.id === pageId, patch({
          rowItems: updateItem<IRow>(r => r.id === rowId, patch({
            gridItems: row?.gridItems,
          })),
        })),
      }),
    }));
  }
}
