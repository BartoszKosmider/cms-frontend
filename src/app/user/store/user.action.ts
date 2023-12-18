export class GetUser {
  public static readonly type = '[User] Get user';
  constructor() { }
}

export class GetCategories {
  public static readonly type = '[User] Get categories';
  constructor() { }
}

export class DeleteCategories {
  public static readonly type = '[User] Delete categories';
  constructor(public categoriesToDelete: string[]) { }
}

export class AddNewCategory {
  public static readonly type = '[User] Add new category';
  constructor(public category: string) { }
}

export class GetArticles {
  public static readonly type = '[User] Get articles';
  constructor() { }
}

export class DeleteArticles {
  public static readonly type = '[User] Delete articles';
  constructor(public articleIds: number[]) { }
}

