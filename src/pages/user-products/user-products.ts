import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {SearchPage} from "../search/search";
import {BasePage} from "../../shared/base.page";
import {ProductPage} from "../product/product";
import {UserProductsService} from "../../shared/servises/user-products.servise";
import {UserProductPage} from "../user-product/user-product";
import {ContactsAllPage} from "../contacts-all/contacts-all";
import {UserProductCategoriesPage} from "../user-product-categories/user-product-categories";
import {CategoriesPage} from "../categories/categories";

/**
 * Generated class for the UserProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-products',
  templateUrl: 'user-products.html',
})
export class UserProductsPage extends BasePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected alertCtrl: AlertController,
    protected userProductsService: UserProductsService,

  ) {
    super(alertCtrl);
  }

  params = this.navParams.get('params');
  protected searchPage = SearchPage;
  protected userProductPage = UserProductPage;
  shop = this.params.shop;
  products;
  infiniteScroll;
  pageNum: number = 1;

  ionViewDidLoad() {
    console.log(this.shop);
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.userProductsService.getUserProducts(
        this.shop.shop_id,
        this.pageNum
      )
      .subscribe((data) => {
        this.products = data;

        this.disablePreloader();
      });

  }

  onClick(item): void{
    this.navCtrl.push(UserProductPage, {params: {product: item}});
  }

  doInfinite(infiniteScroll): void {
    this.infiniteScroll = infiniteScroll;
    this.pageNum = ++this.pageNum;

    this.subs$[this.subs$.length] =
      this.userProductsService.getUserProducts(
        this.shop.shop_id,
        this.pageNum,
      )
      .subscribe((data) => {
        if (data.length) {
          this.products.push(...data);
          this.infiniteScroll.complete();
        } else {
          this.infiniteScroll.enable(false);
        }
      });
  }

  doRefresh(refresher): void {
    this.pageNum = 1;

    this.subs$[this.subs$.length] =
      this.userProductsService.getUserProducts(
        this.shop.shop_id,
        this.pageNum,
      )
      .subscribe((data) => {
        this.products = data;
        refresher.complete();
        if(this.infiniteScroll) this.infiniteScroll.enable(true);
      });
  }

  removeProduct(): void {

  }


}
