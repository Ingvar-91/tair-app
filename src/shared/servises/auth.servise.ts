import {Api} from "../core/api";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as moment from 'moment'
import {AccessToken} from "../interfaces/accessToken";
import {Observable} from "../../../node_modules/rxjs";
import {User} from "../interfaces/user";

@Injectable()
export class AuthServise extends Api {

  private actionName = 'auth';
  auth: boolean = false;
  user: User | null;

  constructor(
    protected httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  login(email: string, password: string | number) {
    return this.post(`${this.actionName}/login`, {email: email, password: password});
  }

  setAuthToken(token: AccessToken) {
    if(token){
      window.localStorage.setItem('access_token', JSON.stringify(token));
    }
  }

  getUser() {
    const headersAuth = this.headersAuth();
    if(headersAuth){/* Если есть токен для авторизации */
      return this.get(`${this.actionName}/user`, headersAuth);
    } else {
      return Observable.throw('access token not exist');
    }
  }

  check(): boolean {
    const access_token: AccessToken = JSON.parse(window.localStorage.getItem('access_token'));
    if(access_token){
      const now = moment().format('YYYY-MM-DD HH:mm:ss');
      const expires_at = moment(access_token.expires_at).format('YYYY-MM-DD HH:mm:ss');

      if(expires_at > now) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  /*getToken(): string | null {
    const access_token: AccessToken = JSON.parse(window.localStorage.getItem('access_token'));
    if(access_token){
      return access_token.access_token;
    }
    return null;
  }

  getTypeToken(): string | null {
    const access_token: AccessToken = JSON.parse(window.localStorage.getItem('access_token'));
    if(access_token){
      return access_token.token_type;
    }
    return null;
  }*/

  userExist(email: string) {
    return this.get(`${this.actionName}/userExist?email=${email.toLowerCase()}`);
  }

  logout(): void {
    window.localStorage.setItem('access_token', '');
    //window.localStorage.setItem('user', '');
    //window.localStorage.clear();
  }

  /*check(): boolean {
    if (JSON.parse(window.localStorage.getItem('user'))) {
      return true;
    } else {
      return false;
    }
  }*/

}
