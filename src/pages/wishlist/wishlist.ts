import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {HomeService} from "../../shared/servises/home.servise";
import {NetworkServise} from "../../shared/servises/network.servise";

/**
 * Generated class for the WishlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wishlist',
  templateUrl: 'wishlist.html',
})
export class WishlistPage extends BasePage {

  constructor(
    protected alertCtrl: AlertController
  ){
    super(alertCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WishlistPage');
  }

}
