import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import * as _ from 'lodash';
import { Editor, Toolbar, Validators as EditorValidators } from 'ngx-editor';
import { ClearArticle, GetArticle, SaveArticle, UpdateArticle } from '../store/article.action';
import { ArticleState } from '../store/article.state';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { IArticle, ISaveArticle } from '../../shared/models/article.model';
import { CategoryState } from 'src/app/user/category-list/store/category.state';
import { ICategory } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnDestroy {
  public articleId?: number;
  public editor = new Editor();
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categoryId: new FormControl<number | undefined>(undefined, [Validators.required]),
    editorContent: new FormControl<Record<string, any>>(
      { value: null, disabled: false },
      EditorValidators.required()
    ),
    description: new FormControl('', [Validators.required]),
  });

  @Select(ArticleState.article)
  public article$?: Observable<IArticle>;

  @Select(CategoryState.categories)
  public categories$?: Observable<ICategory[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.route.params.subscribe(params => {
      const articleId = params['articleId']
      if (_.isNil(articleId) || articleId === 'new') {
        this.store.dispatch(new ClearArticle());

        return;
      }

      this.articleId = +articleId;
      this.store.dispatch(new GetArticle(this.articleId));
    });

    this.article$?.pipe(
      takeUntil(this.destroy$),
      filter(a => !_.isNil(a)),
    ).subscribe(article => {
      this.form.patchValue({
        title: article.title,
        categoryId: article.categoryId,
        editorContent: article.definition,
        description: article.description,
      });
      this.form.updateValueAndValidity();
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public saveArticle(): void {
    if (this.form.invalid) {
      return;
    }

    const formValues = this.form.getRawValue();
    if (_.isNil(this.articleId)) {
      this.store.dispatch(new SaveArticle(<ISaveArticle>{
        title: formValues.title,
        categoryId: <number>formValues.categoryId,
        description: formValues.description,
        contents: JSON.stringify(formValues.editorContent),
      }));
    } else {
      this.store.dispatch(new UpdateArticle(<ISaveArticle>{
        title: formValues.title,
        categoryId: <number>formValues.categoryId,
        description: formValues.description,
        contents: JSON.stringify(formValues.editorContent),
      }, this.articleId));
    }
  }
}
