import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AlertController,
  Events,
  ModalController,
  NavController,
  NavParams,
  Platform,
  Slides,
  ToastController
} from 'ionic-angular';
import {SearchPage} from '../search/search';
import {BasePage} from '../../shared/base.page';
import {HomeService} from '../../shared/servises/home.servise';
import {ProductPage} from '../product/product';
import {ShopPage} from '../shop/shop';
import {AllEntPlacesPage} from '../all-ent-places/all-ent-places';
import {AllNoveltyPage} from '../all-novelty/all-novelty';
import {AllTopShopPage} from '../all-top-shop/all-top-shop';
import {AllBrandsPage} from '../all-brands/all-brands';
import {DetailShopPage} from '../detail-shop/detail-shop';
import {NetworkServise} from "../../shared/servises/network.servise";
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage {

  protected searchPage = SearchPage;
  slides: any[];
  brands: any[];
  entertainmentPlaces: any[];
  productsDay: any[];
  shopsTop: any[];
  slidesPerView: number = 2;
  @ViewChild('homeSlides') homeSlides: Slides;
  @ViewChild('brandsSlides') brandsSlides: Slides;
  @ViewChild('noveltySlides') noveltySlides: Slides;
  @ViewChild('topShopSlides') topShopSlides: Slides;

  /*alertDisconnect = this.alertCtrl.create({
    subTitle: 'Нет соединения с интернетом',
    buttons: ['Ok']
  });*/

  constructor(
    private navParams: NavParams,
    private homeService: HomeService,
    public platform : Platform,
    public navCtrl: NavController,
    public events: Events,
    private networkServise: NetworkServise,
    protected alertCtrl: AlertController
    /*private network: Network,
    private alertCtrl: AlertController*/
  ){
    super(alertCtrl);

    //this.networkServise.checkNetwork(this.navCtrl);
  }

  ionViewDidLoad() {
    this.setSlidesPerView(this.platform.width());

    this.checkNetwork(this.navCtrl);

    //this.networkServise.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.homeService.getData()
        .subscribe((data) => {
          this.slides = data.slider;
          this.entertainmentPlaces = data.entertainmentPlaces;
          this.productsDay = data.productsDay;
          this.shopsTop = data.shopsTop;
          this.brands = data.brands;

          this.disablePreloader();
        });

  }

  ionViewDidEnter() {
  }

  slidePrev(){
    this.homeSlides.slidePrev();
  }

  slideNext(){
    this.homeSlides.slideNext();
  }

  /*checkNetwork() {
    // NETWORK STATUS
    this.disconnectSub$ = this.network.onDisconnect().subscribe(() => {
      //this.networkCap = false;
      //this.networkStatus = false;
      this.alertDisconnect.present();
    });

    this.connectSub$ = this.network.onConnect().subscribe(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      //this.networkStatus = true;
      //this.networkCap = true;
      this.alertDisconnect.dismiss();
    });
    // NETWORK STATUS END
  }*/

  onResize(event) {
    this.homeSlides.update();
    this.homeSlides.slideTo(0);

    this.brandsSlides.update();
    this.brandsSlides.slideTo(0);

    this.noveltySlides.update();
    this.noveltySlides.slideTo(0);

    this.topShopSlides.update();
    this.topShopSlides.slideTo(0);

    this.setSlidesPerView(event.target.innerWidth);
  }

  doRefresh(refresher) {
    this.subs$[this.subs$.length] =
      this.homeService.getData()
        .subscribe((data) => {
          this.slides = data.slider;
          this.entertainmentPlaces = data.entertainmentPlaces;
          this.productsDay = data.productsDay;
          this.shopsTop = data.shopsTop;
          this.brands = data.brands;
          refresher.complete();
        });
  }

  setSlidesPerView(width) {
    if(width > 1200) {
      this.slidesPerView = 5;
    }
    else if(width > 768) {
      this.slidesPerView = 4;
    }
    else if(width > 480) {
      this.slidesPerView = 3;
    }
    else if(width > 320) {
      this.slidesPerView = 2;
    }
  }

  onClickProduct(item) {
    this.navCtrl.push(ProductPage, {params: {product_id: item.id}});
  }

  onClickShop(item) {
    if(item.shop_type_id == 1) {
      this.navCtrl.push(ShopPage, {params: {shop_id: item.id}});
    } else if(item.shop_type_id == 5) {
      this.navCtrl.push(DetailShopPage, {params: {shop_id: item.id, detailShop: false}});
    }
  }

  onClickBrandsNav() {
    this.navCtrl.push(AllBrandsPage);
  }

  onClickEntPlacesNav() {
    this.navCtrl.push(AllEntPlacesPage);
  }

  onClickNoveltyNav() {
    this.navCtrl.push(AllNoveltyPage);
  }

  onClickTopShopNav() {
    this.navCtrl.push(AllTopShopPage);
  }

}
