import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {ProductsService} from '../../shared/servises/products.servise';
import {SearchPage} from '../search/search';
import {isDiscount} from "../../shared/core/util/discount";
import {CallNumber} from "@ionic-native/call-number";

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage extends BasePage {

  product: Products;
  chars: any[];
  params = this.navParams.get('params');
  protected searchPage = SearchPage;

  constructor(
    private navParams: NavParams,
    private productsService: ProductsService,
    private callNumber: CallNumber,
    protected alertCtrl: AlertController,
    public navCtrl: NavController,
  ){
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.productsService.getById(
        this.params.product_id
      )
      .subscribe((data) => {
        this.chars = data.chars;
        this.product = data.product;
        this.product.isDiscount = isDiscount(this.product['start_discount'], this.product['end_discount'], this.product['discount']);

        this.disablePreloader();
      });
  }

  onClickPhone(main_phone) {
    this.call(main_phone);
  }

  async call(number: any) {
    this.callNumber.callNumber(String(number), true);
  }

  setWishlist(id: number) {

  }

}
