import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DetailShopPage} from '../detail-shop/detail-shop';
import {BasePage} from '../../shared/base.page';
import {SearchPage} from '../search/search';

/**
 * Generated class for the PopoverShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-shop',
  templateUrl: 'popover-shop.html',
})
export class PopoverShopPage extends BasePage {

  detailShop:boolean = false;
  params = this.navParams.get('params');
  shop;
  protected searchPage = SearchPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.shop = this.params.shop;
    this.detailShop = this.params.detailShop;
  }

  onClickDetailShop(shop) {
    this.navCtrl.push(DetailShopPage, {params: {shop_id: shop.id, detailShop: false}});
  }

}
