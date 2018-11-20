import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';

@Injectable()
export class ProductCategoriesService extends Api {

  actionName = 'productCategories';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getById(category_id: number) {
    return this.get(`${this.actionName}/getById/${category_id}`);
  }

  getAll() {
    return this.get(`${this.actionName}/getAll`);
  }


}
