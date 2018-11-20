import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {ShopsService} from '../../shared/servises/shops.servise';
import {ShopPage} from '../shop/shop';
import {DetailShopPage} from '../detail-shop/detail-shop';
import {SearchPage} from '../search/search';

/**
 * Generated class for the AllEntPlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-ent-places',
  templateUrl: 'all-ent-places.html',
})
export class AllEntPlacesPage extends BasePage {

  items:any;
  protected searchPage = SearchPage;

  constructor(
    private shopsService: ShopsService,
    public navCtrl: NavController,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.shopsService.getAllEntPlaces()
      .subscribe((data) => {
        this.items = data;

        this.disablePreloader();
      });
  }

  onClick(item) {
    if(item.shop_type_id == 1) {
      this.navCtrl.push(ShopPage, {params: {shop_id: item.id}});
    } else if(item.shop_type_id == 5) {
      this.navCtrl.push(DetailShopPage, {params: {shop_id: item.id, detailShop: false}});
    }
  }

}
