import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SearchPage} from "../search/search";
import {AuthServise} from "../../shared/servises/auth.servise";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {debounceTime, map} from "rxjs/operators";
import {User} from "../../shared/interfaces/user";
import {BasePage} from "../../shared/base.page";
import {AccessToken} from "../../shared/interfaces/accessToken";

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage extends BasePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authServise: AuthServise,
    protected alertCtrl: AlertController
  ) {
    super(alertCtrl);
  }

  protected searchPage = SearchPage;
  form: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email], this.emailExist.bind(this)),
    'password': new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.disablePreloader();

    /*
    this.authServise.getUser()
      .subscribe((data) => {
        this.authServise.user = data.user;
        this.authServise.auth = true;

        this.disablePreloader();
      },err => {
        this.authServise.auth = false;
        this.disablePreloader();
      },() => {});
    */
  }

  login() {
    this.authServise.login(
      this.form.value.email,
      this.form.value.password
    )
    .subscribe((data) => {
      const token: AccessToken = {
        access_token: data.access_token,
        expires_at: data.expires_at,
        token_type: data.token_type
      }
      this.authServise.setAuthToken(token);

      this.authServise.user = data;
      this.authServise.auth = true;
    });
  }

  logout(){
    this.authServise.user = null;
    this.authServise.auth = false;
    this.authServise.logout();
  }

  emailExist(control: FormControl): Observable<ValidationErrors> {
    return this.authServise.userExist(this.form.value.email)
      .pipe(
        debounceTime(600),
        map(data => {
          if (data.exist === true) {
            return {userExist: true};
          } else {
            return null;
          }
        })
      );
  }

}
