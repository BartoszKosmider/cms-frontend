import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, createSelector } from "@ngxs/store";
import { ISite, IMenuItem, IBaseComponent, IHeader, IFooter, IRow } from '../../shared/models/site.model';
import { AddNewPage, AddNewRow, DeletePage, DeleteRow, DiscardSiteChanges, GetSite, PatchPage, SetComponentToEdit, SetPageId, ToggleEditMode, UpdateRowColumns } from './site.actions';
import { append, patch, removeItem, updateItem } from "@ngxs/store/operators";
import { getGrid, getRow, getMenuItem } from '../../shared/models/default-components.model';
import * as _ from "lodash";
import { SiteService } from '../../shared/services/site.service';
import { exhaustMap } from "rxjs/operators";
import { of } from "rxjs";

export interface ISiteState {
  site: ISite;
  sitePreviousVersion?: ISite;
  pageId: string;
  componentToEdit?: IBaseComponent;
  isEditMode: boolean;
}

@State<ISiteState>({
  name: 'SiteState',
  defaults: {
    site: <ISite>{},
    sitePreviousVersion: undefined,
    pageId: '',
    isEditMode: false,
  },
})
@Injectable()
export class SiteState {
  public constructor(
    private siteService: SiteService,
  ) { }

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
    return state.pageId;
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

  @Selector()
  public static isEditMode(state: ISiteState): boolean {
    return state.isEditMode;
  }

  @Action(GetSite)
  public getSite(ctx: StateContext<ISiteState>, action: GetSite): void {
    this.siteService.getSite().subscribe(val => {
      ctx.patchState({
        site: val
      });
    })
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

  @Action(DeleteRow)
  public deleteRow(ctx: StateContext<ISiteState>, {rowId}: DeleteRow): void {
    const pageId = ctx.getState().pageId;
    ctx.setState(patch<ISiteState>({
      site: patch({
        menuItems: updateItem<IMenuItem>(mi => mi.id === pageId, patch({
          rowItems: removeItem<IRow>(row => row.id === rowId),
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

  @Action(ToggleEditMode)
  public toggleEditMode(ctx: StateContext<ISiteState>): void {
    const isEditMode = ctx.getState().isEditMode;
    if (!isEditMode) {
      ctx.patchState({
        sitePreviousVersion: _.cloneDeep(ctx.getState().site),
      });
    }
    ctx.patchState({
      isEditMode: !isEditMode,
    });
  }

  @Action(DiscardSiteChanges)
  public discardSiteChanges(ctx: StateContext<ISiteState>): void {
    const state = ctx.getState();
    ctx.patchState({
      site: state.sitePreviousVersion,
    });
  }

  @Action(AddNewPage)
  public addNewPage(ctx: StateContext<ISiteState>): void {
    ctx.setState(
      patch<ISiteState>({
        site: patch({
          menuItems: append<IMenuItem>([getMenuItem()]),
        }),
      }),
    );
  }

  @Action(PatchPage)
  public patchPage(ctx: StateContext<ISiteState>, action: PatchPage): void {
    if (_.isNil(action.pageId) || action.pageId.trim() === '') {
      return;
    }

    ctx.setState(patch<ISiteState>({
      site: patch({
        menuItems: updateItem<IMenuItem>(mi => mi.id === action.pageId, patch({
          title: action.title,
        })),
      }),
    }));
  }

  @Action(DeletePage)
  public deletePage(ctx: StateContext<ISiteState>, action: DeletePage): void {
    ctx.setState(patch<ISiteState>({
      site: patch({
        menuItems: removeItem<IMenuItem>(mi => mi.id === action.pageId),
      }),
    }));
  }
}
