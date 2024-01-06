import { Component, Input } from '@angular/core';
import { IBlockComponent } from '../../../../../shared/models/site.model';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SiteState } from 'src/app/site-template/store/site.state';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  @Input()
  public component!: IBlockComponent;

  @Select(SiteState.isEditMode)
  public isEditMode?: Observable<boolean>;
}
