import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from "../../shared/base.page";
import {ShopsService} from "../../shared/servises/shops.servise";

/**
 * Generated class for the MyShopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-shops',
  templateUrl: 'my-shops.html',
})
export class MyShopsPage extends BasePage {

  constructor(
    private shopsService: ShopsService,
    protected viewCtrl: ViewController,
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  items;

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);
    /*
    this.subs$[this.subs$.length] =
      this.shopsService.getMyShops()
        .subscribe((data) => {
          console.log(data);
          this.items = data;

          this.disablePreloader();
        });
    */

  }

  onClick(item) {

  }

}
