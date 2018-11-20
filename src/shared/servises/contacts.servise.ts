import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Api} from '../core/api';

@Injectable()
export class ContactsService extends Api {

  private actionName = 'contacts';

  constructor(
      protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  getAllNumbers() {
    return this.get(`${this.actionName}/getAllNumbers`);
  }

}
