import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';

@Injectable()
export class HomeService extends Api {

  private actionName = 'home';

  constructor(
      protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  getData() {
    return this.get(`${this.actionName}`);
  }

  getAllBrands() {
    return this.get(`${this.actionName}/getAllBrands`);
  }

}
