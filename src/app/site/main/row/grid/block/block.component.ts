import { Component, Input } from '@angular/core';
import { IBlockComponent } from '../../../../../shared/models/site.model';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  @Input()
  public component!: IBlockComponent;
}
