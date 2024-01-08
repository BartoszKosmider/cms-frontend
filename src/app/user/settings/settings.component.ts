import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { DeleteCurrentUser } from '../store/user.action';
import { UserInteractionsService } from 'src/app/shared/user-interactions/user-interactions.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  constructor(
    private store: Store,
    private userInteractionsService: UserInteractionsService,
  ) { }

  public deleteUser(): void {
    const popupRef = this.userInteractionsService.openQuestionDialog({
      question: 'Are you sure?',
    });

    popupRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteCurrentUser());
      }
    })
  }
}
