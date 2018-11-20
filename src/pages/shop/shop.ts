import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {ShopsService} from '../../shared/servises/shops.servise';
import {ProductPage} from '../product/product';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {PopoverShopPage} from '../popover-shop/popover-shop';
import {SearchPage} from '../search/search';
import {CallNumber} from "@ionic-native/call-number";
import {NetworkServise} from "../../shared/servises/network.servise";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage extends BasePage {

  constructor(
    private navParams: NavParams,
    private shopsService: ShopsService,
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    private callNumber: CallNumber,
    //private networkServise: NetworkServise,
    protected alertCtrl: AlertController,
  ){
    super(alertCtrl);
  }

  actionName = 'shop';
  shop: Shops[] = [];
  products: any[];
  preloader = false;
  page = ProductPage;
  pageNum = 1;
  params = this.navParams.get('params');
  infiniteScroll;
  protected searchPage = SearchPage;

  ionViewDidLoad() {
    //this.networkServise.checkNetwork();
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      forkJoin(
        this.shopsService.getById(
          this.params.shop_id
        ),
        this.shopsService.getProducts(
          this.params.shop_id,
          this.pageNum
        )
      )
        .subscribe((data) => {
          this.shop = data[0];
          this.products = data[1].products.data;

          this.disablePreloader();
        });
  }

  /*загрузка данных при скролле до конца*/
  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.pageNum = ++this.pageNum;

    this.subs$[this.subs$.length] =
      this.shopsService.getProducts(
        this.params.shop_id,
        this.pageNum
      )
      .subscribe((data) => {
        if (data.products.data.length) {
          this.products.push(...data.products.data);
          this.infiniteScroll.complete();
        } else {
          this.infiniteScroll.enable(false);
        }
      });

  }

  /* обновление */
  doRefresh(refresher) {
    this.pageNum = 1;

    this.subs$[this.subs$.length] =
      this.shopsService.getProducts(
        this.params.shop_id,
        this.pageNum
      )
      .subscribe((data) => {
        this.products = data.products.data;
        refresher.complete();
        if(this.infiniteScroll) this.infiniteScroll.enable(true);
      });
  }

  onClick(item) {
    this.navCtrl.push(ProductPage, {params: {product_id: item.id}});
  }

  onClickShopPop(event, shop) {
    let popover = this.popoverCtrl.create(PopoverShopPage, {params: {shop: shop, detailShop: false}});
    popover.present({ev: event});
  }

  onClickPhone(main_phone) {
    this.call(main_phone);
  }

  async call(number: any) {
    this.callNumber.callNumber(String(number), true);
  }

}

