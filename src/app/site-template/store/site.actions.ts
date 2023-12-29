import { IBaseComponent, IMenuItem } from "src/app/shared/models/site.model";

export class GetSite {
  public static readonly type = '[Site] Get site';
  public constructor() { }
}

export class SetPageId {
  public static readonly type = '[Site] Set page id';
  public constructor(public pageId: string | undefined) { }
}

export class SetComponentToEdit {
  public static readonly type = '[Site] Set component to edit';
  public constructor(public component?: IBaseComponent) { }
}

export class AddNewRow {
  public static readonly type = '[Site] Add new row';
  public constructor(public pageId: string) { }
}

export class DeleteRow {
  public static readonly type = '[Site] Delete row';
  public constructor(public rowId: string) { }
}

export class UpdateRowColumns {
  public static readonly type = '[Site] Update row columns';
  public constructor(public rowId: string, public numberOfColumns: number) { }
}

export class ToggleEditMode {
  public static readonly type = '[Site] Toggle edit mode';
}

export class DiscardSiteChanges {
  public static readonly type = '[Site] Discard site changes';
}

export class AddNewPage {
  public static readonly type = '[Site] Add new page';
  // public constructor(public pageId: string) { }
}

export class PatchPage {
  public static readonly type = '[Site] Patch page';
  public constructor(public pageId: string, public title: string) { }
}

export class DeletePage {
  public static readonly type = '[Site] Delete page';
  public constructor(public pageId: string) { }
}

