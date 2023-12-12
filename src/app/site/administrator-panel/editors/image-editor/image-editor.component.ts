import { Component } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { FormControl } from '@angular/forms';
import { IImageComponent } from 'src/app/shared/models/site.model';
import * as _ from 'lodash';
import { debounceTime, filter } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.scss',
  inputs: BaseEditor.genericInputs,
})
export class ImageEditorComponent extends BaseEditor<IImageComponent> {
  public urlPath = new FormControl<string>('');
  public imageFile = new FormControl();
  public description = new FormControl(null);

  constructor() {
    super();
    this.description.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(description => {
      if (!_.isNil(description)) {
        this.value.description = <string>description;
      }
    });
  }

  public load(): void {
    if (!_.isNil(this.urlPath.value)) {
      this.value.imgPath = this.urlPath.value;
    }
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.value.imgPath = <string>reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
