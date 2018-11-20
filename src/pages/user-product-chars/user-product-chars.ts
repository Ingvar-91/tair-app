import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from "../../shared/base.page";

/**
 * Generated class for the UserProductCharsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-product-chars',
  templateUrl: 'user-product-chars.html',
})
export class UserProductCharsPage extends BasePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected alertCtrl: AlertController,
    public viewCtrl: ViewController,
  ) {
    super(alertCtrl);
  }

  chars = this.navParams.get('chars');
  char = [];

  ionViewDidLoad() {
  }

  onClick() {
    this.viewCtrl.dismiss({chars:Object.keys(this.char)});
  }


}
