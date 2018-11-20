import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';
import {Observable} from "../../../node_modules/rxjs";

@Injectable()
export class UserShopService extends Api {

  private actionName = 'user-shop';

  constructor(
      protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  /* получить все магазины юзера */
  getAll(): Observable<any> {
    return this.get(`${this.actionName}/getAll`, this.headersAuth());
  }
}
