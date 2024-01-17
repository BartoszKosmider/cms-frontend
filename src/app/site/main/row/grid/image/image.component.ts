import { Component, Input, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import * as _ from 'lodash';
import { Observable, Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { IImageDialogData } from 'src/app/shared/models/app.model';
import { IImageComponent } from 'src/app/shared/models/site.model';
import { DialogImageComponent } from 'src/app/shared/user-interactions/dialog-image/dialog-image.component';
import { UserInteractionsService } from 'src/app/shared/user-interactions/user-interactions.service';
import { SiteState } from 'src/app/site-template/store/site.state';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnDestroy {
  @Select(SiteState.isEditMode)
  public isEditMode$?: Observable<boolean>;

  public isEditMode?: boolean;

  private destroy$ = new Subject<void>();

  @Input()
  public component!: IImageComponent;

  constructor(
    private userInteractionsService: UserInteractionsService,
  ) {

    this.isEditMode$?.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$),
    ).subscribe(value => this.isEditMode = value);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openInDialog(): void {
    if (_.isNil(this.component.imgPath)) {
      return;
    }

    this.userInteractionsService.openCustomPopup<DialogImageComponent, IImageDialogData>(DialogImageComponent, {
      image: this.component.imgPath,
    })
  }
}
