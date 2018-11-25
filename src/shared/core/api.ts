import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {AccessToken} from "../interfaces/accessToken";

@Injectable()
export class Api {

  constructor(
    protected httpClient: HttpClient
  ) {
    /*header options
    const token = this.getToken();
    const type_token = this.getTypeToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Accept':  'application/json',
        'Authorization': `${type_token} ${token}`
      })
    }
    */
  }

  private getUrl(url: string = ''): string {
    return environment.apiUrl + url;
  }

  protected get(url: string = '', httpOptions: object = {}): Observable<any> {
    return this.httpClient.get(this.getUrl(url), httpOptions).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  protected post(url: string = '', data: any = {}, httpOptions: object = {}): Observable<any> {
    return this.httpClient.post(this.getUrl(url), data, httpOptions).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  protected put(url: string = '', data: any = {}, httpOptions: object = {}): Observable<any> {
    let http = this.httpClient.put(this.getUrl(url), data, httpOptions);
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      http = this.httpClient.post(this.getUrl(url), data, httpOptions);
    }
    return http.pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  protected remove(url: string = '', httpOptions: object = {}): Observable<any> {
    return this.httpClient.delete(this.getUrl(url), httpOptions).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error);
  }

  /*private getToken(): string | null {
    if(window.localStorage.getItem('access_token') === null){
      const access_token: AccessToken = JSON.parse(window.localStorage.getItem('access_token'));
      if(access_token){
        return access_token.access_token;
      }
    }
    return null;
  }

  private getTypeToken(): string | null {
    if(window.localStorage.getItem('access_token') === null){
      const access_token: AccessToken = JSON.parse(window.localStorage.getItem('access_token'));
      if(access_token){
        return access_token.token_type;
      }
    }
    return null;
  }*/

  /* Заголовки авторизации */
  headersAuth(): any {
    const json = window.localStorage.getItem('access_token');
    if(json){
      const access_token: AccessToken = JSON.parse(json);
      if(access_token && access_token.token_type && access_token.access_token){
        return {
          headers: new HttpHeaders({
            /*'Content-Type': 'application/x-www-form-urlencoded',*/
            'Accept':'application/json; charset=utf-8',
            'Authorization': `${access_token.token_type} ${access_token.access_token}`
          })
        }
      } else {
        return false;
      }

    } else {
      return false;
    }

  }
}
