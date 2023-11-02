import { Component, Input } from '@angular/core';
import { IImageComponent } from 'src/app/shared/models/site.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input()
  public component!: IImageComponent;
}
