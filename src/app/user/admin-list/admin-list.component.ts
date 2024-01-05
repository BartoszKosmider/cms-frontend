import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from '../store/user.state';
import { UserInteractionsService } from 'src/app/shared/user-interactions/user-interactions.service';
import { IAdminAccount } from 'src/app/shared/models/user.model';
import { DeleteAdmins, GetAdmins } from '../store/user.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss',
})
export class AdminListComponent {
  public selection = new SelectionModel<IAdminAccount>(true, []);
  public displayedColumns = ['username', 'select'];

  @Select(UserState.admins)
  public admins$?: Observable<IAdminAccount[]>;

  constructor(
    private store: Store,
    private userInteractionsService: UserInteractionsService,
  ) {
    this.store.dispatch(new GetAdmins());
  }

  public deleteSelected(): void {
    const popupRef = this.userInteractionsService.openQuestionDialog({
      question: 'Are you sure?',
    });

    popupRef.afterClosed().subscribe(result => {
      if (result) {
        const adminsToDelete = this.selection.selected.map(c => c.username);
        this.store.dispatch(new DeleteAdmins(adminsToDelete));
      }
    });
  }

  public isAllSelected(adminsLength: number): boolean {
    return this.selection.selected.length == adminsLength;
  }

  public toggleAllRows(admins: IAdminAccount[]) {
    this.isAllSelected(admins.length)
      ? this.selection.clear()
      : this.selection.setSelection(...admins);
  }

  public registerAdmin(): void {
    this.store.dispatch(new Navigate(['/register']));
  }
}
