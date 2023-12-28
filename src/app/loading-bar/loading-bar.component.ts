import { Component, NgZone } from '@angular/core';
import { UserInteractionsService } from '../shared/user-interactions/user-interactions.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrl: './loading-bar.component.scss',
})
export class LoadingBarComponent {
  public isLoading: boolean = false;

  public constructor(
    public  userInteractionsService: UserInteractionsService,
    private zone: NgZone,
    ) {
    this.userInteractionsService.isLoading.subscribe(value => {
      this.zone.run(() => {
        this.isLoading = value;
      });
    });
  }
}
