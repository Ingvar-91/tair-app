import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';

@Injectable()
export class ShopsService extends Api {

  private actionName = 'shops';

  constructor(
      protected httpClient: HttpClient
  ) {
    super(httpClient);
  }

  /*getData(sort: string = 'id', order: string = 'desc', page: number, pageSize: number = 10, filterField: string | null, filterValue: string | null) {
    return this.get(`${this.actionName}?limit=${pageSize}&sort=${sort}&order=${order}&offset=${(page * pageSize)}&searchValue=${filterValue}&searchField=${filterField}`);
  }*/

  getById(shop_id: number) {
    return this.get(`${this.actionName}/getById/${shop_id}`);
  }

  getShops(page: number) {
      return this.get(`${this.actionName}/getAll?page=${page}`);
  }

  getProducts(shop_id: number, pageNum: number) {
    return this.get(`${this.actionName}/getProducts/${shop_id}?page=${pageNum}`);
  }

  getAllEntPlaces() {
    return this.get(`${this.actionName}/getAllEntPlaces`);
  }

  getShopTop() {
    return this.get(`${this.actionName}/getShopTop`);
  }

}
