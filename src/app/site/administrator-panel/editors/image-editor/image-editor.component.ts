import { Component, OnDestroy } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { FormControl } from '@angular/forms';
import { IImageComponent } from 'src/app/shared/models/site.model';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { UserInteractionsService } from 'src/app/shared/user-interactions/user-interactions.service';
import { IBaseDialogData } from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.scss',
  inputs: BaseEditor.genericInputs,
})
export class ImageEditorComponent extends BaseEditor<IImageComponent> implements OnDestroy {
  public urlPath = new FormControl<string>('');
  public imageFile = new FormControl();

  private allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  private destroy$ = new Subject<void>();

  constructor(
    private userInteractionsService: UserInteractionsService,
  ) {
    super();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // public load(): void {
  //   if (!_.isNil(this.urlPath.value)) {
  //     this.value.imgPath = this.urlPath.value;
  //   }
  // }

  public onFileSelected(event: any): void {
    const file = <File>event.target.files[0];
    if (file) {
      if (!this.allowedFileTypes.includes(file.type)) {
        this.userInteractionsService.openDialog<IBaseDialogData, void>({
          title: 'Validation error!',
          message: 'File type is not supported'
        });

        return;
      }

      const reader = new FileReader();
      reader.onload = e => {
        this.value.imgPath = <string>reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
