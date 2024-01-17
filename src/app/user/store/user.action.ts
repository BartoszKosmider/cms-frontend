import { SortingType } from "src/app/shared/models/article.model";
import { ILoginDto, IRegisterUserDto } from "src/app/shared/models/user.model";

export class GetArticles {
  public static readonly type = '[User] Get articles';
  constructor(public sortingType: SortingType, public numberOfElements: number, public pageIndex: number) { }
}

export class DeleteArticles {
  public static readonly type = '[User] Delete articles';
  constructor(public articleIds: number[]) { }
}

export class LoginUser {
  public static readonly type = '[User] Login user';
  constructor(public dto: ILoginDto) { }
}

export class RegisterUser {
  public static readonly type = '[User] Register user';
  constructor(public dto: IRegisterUserDto) { }
}

export class RegisterAdmin {
  public static readonly type = '[User] Register admin';
  constructor(public dto: IRegisterUserDto) { }
}

export class Logout {
  public static readonly type = '[User] Logout';
  constructor() { }
}

export class GetAdmins {
  public static readonly type = '[User] Get admins';
  constructor() { }
}

export class DeleteAdmins {
  public static readonly type = '[User] Delete admins';
  constructor(public usersToDelete: string[]) { }
}

export class DeleteCurrentUser {
  public static readonly type = '[User] Delete current user';
}

