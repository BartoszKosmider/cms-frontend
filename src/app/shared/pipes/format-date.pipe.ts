import { Pipe, type PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { DATE_FORMAT } from '../models/app.model';

@Pipe({
  name: 'appFormatDate',
})
export class FormatDatePipe implements PipeTransform {

  public transform(value: string): string {
    return moment(value).format(DATE_FORMAT);;
  }

}
