import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform, PopoverController} from 'ionic-angular';
import {PopoverShopPage} from '../popover-shop/popover-shop';
import {BasePage} from '../../shared/base.page';
import {ShopsService} from '../../shared/servises/shops.servise';
import {SearchPage} from '../search/search';
import {CallNumber} from "@ionic-native/call-number";

/**
 * Generated class for the DetailShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-shop',
  templateUrl: 'detail-shop.html',
})
export class DetailShopPage extends BasePage {

  detailShop:boolean = true;
  params = this.navParams.get('params');
  shop;
  protected searchPage = SearchPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private shopsService: ShopsService,
    public platform : Platform,
    private callNumber: CallNumber,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.shopsService.getById(
        this.params.shop_id,
      )
      .subscribe((data) => {
        this.shop = data;

        this.disablePreloader();
      });
    this.detailShop = this.params.detailShop;
  }

  onClickPhone(main_phone) {
    this.call(main_phone);
  }

  async call(number: any) {
    this.callNumber.callNumber(String(number), true);
  }

}
