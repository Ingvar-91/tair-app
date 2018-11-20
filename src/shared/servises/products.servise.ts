import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';

@Injectable()
export class ProductsService extends Api {

  actionName = 'products';

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getById(product_id: number) {
    return this.get(`${this.actionName}/getById/${product_id}`);
  }

  getProductsByCategory(category_id: number, pageNum: number, sort: string = 'new', filterChar: string = '', price: string = '') {
    return this.get(`${this.actionName}/getProductsByCategory/${category_id}?page=${pageNum}&sort=${sort}&filterChar=${filterChar}&price=${price}`);
  }

  getAllNovelty() {
    return this.get(`${this.actionName}/getAllNovelty`);
  }

}
