import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SearchService extends Api {

  private actionName = 'search';

  constructor(
      protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  search(text: string, pageNum: number = 1) {
    if(text){
      return this.post(`${this.actionName}?page=${pageNum}`, {text: text});
    }
    return new Observable(data => {});
  }

}
