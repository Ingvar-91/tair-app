import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {ProductsService} from '../../shared/servises/products.servise';
import {ProductPage} from '../product/product';
import {SearchPage} from '../search/search';

/**
 * Generated class for the AllNoveltyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-novelty',
  templateUrl: 'all-novelty.html',
})
export class AllNoveltyPage extends BasePage {

  items:any;
  protected searchPage = SearchPage;

  constructor(
    private productsService: ProductsService,
    public navCtrl: NavController,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.productsService.getAllNovelty()
        .subscribe((data) => {
          this.items = data;

          this.disablePreloader();
        });
  }

  onClick(item) {
    this.navCtrl.push(ProductPage, {params: {product_id: item.id}});
  }

}
