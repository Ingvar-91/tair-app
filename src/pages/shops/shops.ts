import { Component } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {ShopPage} from '../shop/shop';
import {BasePage} from '../../shared/base.page';
import {ShopsService} from '../../shared/servises/shops.servise';
import {DetailShopPage} from '../detail-shop/detail-shop';
import {SearchPage} from '../search/search';
import {Network} from "@ionic-native/network";

/**
 * Generated class for the ShopsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shops',
  templateUrl: 'shops.html',
})
export class ShopsPage extends BasePage {

  protected searchPage = SearchPage;
  actionName = 'shops';
  items: Shops[] = [];
  allShops: Shops[] = [];
  page = 1;
  preloader = false;

  constructor(
    private shopsService: ShopsService,
    public navCtrl: NavController,
    public platform : Platform,
    public actionSheetCtrl: ActionSheetController,
    protected alertCtrl: AlertController
  ){
    super(alertCtrl);

  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.shopsService.getShops(
        this.page
      )
      .subscribe((data) => {
        this.allShops = data;
        this.items = data;

        this.disablePreloader();
      });

  }

  /*checkNetwork() {
    // NETWORK STATUS
    this.disconnectSub$ = this.network.onDisconnect().subscribe(() => {
      this.networkCap = false;
      this.networkStatus = false;
    });

    this.connectSub$ = this.network.onConnect().subscribe(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      this.networkStatus = true;
      this.networkCap = true;
    });
    // NETWORK STATUS END
  }*/

  onClick(item) {
    if(item.shop_type_id == 1) {
      this.navCtrl.push(ShopPage, {params: {shop_id: item.id}});
    } else if(item.shop_type_id == 5) {
      this.navCtrl.push(DetailShopPage, {params: {shop_id: item.id, detailShop: false}});
    }
  }

  openFilterShop() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Выберите тип арендатора',
      buttons: [
        {
          text: 'Все',
          icon: 'people',
          handler: () => {
            this.items = this.allShops;
          }
        },
        {
          text: 'Магазины',
          icon: 'shirt',
          handler: () => {
            this.items = [];
            for (let item of this.allShops) {
              if (item['shop_type_id'] === 1) {
                this.items.push(item);
              }
            }
          }
        },
        {
          text: 'Развлекательные места',
          icon: 'restaurant',
          handler: () => {
            this.items = [];
            for (let item of this.allShops) {
              if (item['shop_type_id'] === 5) {
                this.items.push(item);
              }
            }
          }
        }
      ]
    });

    actionSheet.present();
  }

}
