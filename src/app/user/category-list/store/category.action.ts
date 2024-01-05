export class GetCategories {
  public static readonly type = '[User] Get categories';
  constructor() { }
}

export class DeleteCategories {
  public static readonly type = '[User] Delete categories';
  constructor(public categoryIds: number[]) { }
}

export class AddNewCategory {
  public static readonly type = '[User] Add new category';
  constructor(public category: string) { }
}
