import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { ITwitterComponent } from 'src/app/shared/models/site.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { SiteState } from 'src/app/site-template/store/site.state';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrl: './twitter.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TwitterComponent implements OnInit {
  @Select(SiteState.isEditMode)
  public isEditMode$?: Observable<boolean>;

  @Input()
  public component!: ITwitterComponent;

  public ngOnInit(): void {
    if (this.component.twitterPostHtml) {
      (<any>window).twttr.widgets.load();
    }
  }
}
