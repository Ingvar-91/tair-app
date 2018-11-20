import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {ShopsService} from '../../shared/servises/shops.servise';
import {ProductCategoriesService} from '../../shared/servises/productCategories.servise';
import {ShopPage} from '../shop/shop';
import {ProductsPage} from '../products/products';
import {SearchPage} from '../search/search';
import {Network} from "@ionic-native/network";
import {NetworkServise} from "../../shared/servises/network.servise";

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage extends BasePage {

  page = CategoriesPage;
  items;
  protected searchPage = SearchPage;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private productCategoriesService: ProductCategoriesService,
    /*private network: Network,
    private alertCtrl: AlertController,*/
    private networkServise: NetworkServise,
    protected alertCtrl: AlertController
  ){
    super(alertCtrl);

    //this.networkServise.checkNetwork(this.navCtrl);
  }

  item = this.navParams.get('item');

  ionViewDidEnter() {
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);
    //this.networkServise.checkNetwork(this.navCtrl);

    if (this.item && this.item.child && this.item.child.length) {
      this.items = this.item.child;

      this.disablePreloader();
    } else {
      this.subs$[this.subs$.length] =
        this.productCategoriesService.getAll()
          .subscribe((data) => {
            this.items = data;

            this.disablePreloader();
          });

    }
  }

  onClick(item) {
    if (item.child && item.child.length) {
      this.navCtrl.push(CategoriesPage, {item: item});
    } else {
      this.navCtrl.push(ProductsPage, {params: {category_id: item.id}});
    }
  }

}
