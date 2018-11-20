import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';

@Injectable()
export class PhotoService extends Api {

  private actionName = 'photo';

  constructor(
      protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  getAllAlbum(offset: number = 0) {
    return this.get(`${this.actionName}/getAllAlbum?offset=${offset}`);
  }

  getPhotosAlbum(id: number) {
      return this.get(`${this.actionName}/getPhotosAlbum/${id}`);
  }

}
