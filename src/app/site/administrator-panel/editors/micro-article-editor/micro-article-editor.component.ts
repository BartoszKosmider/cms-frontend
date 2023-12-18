import { Component, OnInit } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { IMicroArticleComponent } from 'src/app/shared/models/site.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { ArticleService } from 'src/app/shared/services/article.service';
import { NumericDictionary } from 'lodash';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-micro-article-editor',
  templateUrl: './micro-article-editor.component.html',
  styleUrl: './micro-article-editor.component.scss',
  inputs: BaseEditor.genericInputs,
})
export class MicroArticleEditorComponent extends BaseEditor<IMicroArticleComponent> implements OnInit {
  public articleTitle = new FormControl();
  public articlesIdToTitleMap?: NumericDictionary<string>;

  constructor(
    private articleService: ArticleService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.articleTitle.setValue({
      key: this.value.articleId,
      value: this.value.articleTitle,
    });
    this.articleTitle.updateValueAndValidity();

    this.articleTitle.valueChanges.pipe(
      distinctUntilChanged(),
      filter(x => !_.isNil(x) && x !== ''),
      debounceTime(500),
    ).subscribe(title => {
      this.articleService.getArticlesByTitle(title).subscribe(model => {
        this.articlesIdToTitleMap = model.articlesIdToTitleMap;
      });
    });
  }

  public onSelect($event: MatAutocompleteSelectedEvent): void {
    this.value.articleChanged$?.next($event.option.value.key);
  }

  public showTitle(value: any): string {
    return value.value;
  }
}
