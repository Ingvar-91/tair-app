import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SearchPage} from "../search/search";
import {BasePage} from "../../shared/base.page";
import {UserShopService} from "../../shared/servises/user-shops.servise";
import {UserProductsPage} from "../user-products/user-products";

/**
 * Generated class for the UserShopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-shops',
  templateUrl: 'user-shops.html',
})
export class UserShopsPage extends BasePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userShopService: UserShopService,
    protected alertCtrl: AlertController,
    public viewCtrl: ViewController,
  ){
    super(alertCtrl);
  }

  protected searchPage = SearchPage;
  items: any;

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.userShopService.getAll()
        .subscribe((data) => {
          this.items = data;

          this.disablePreloader();
        });
  }

  onClick(item) {
    this.navCtrl.push(UserProductsPage, {params: {shop: item}});
  }

}
