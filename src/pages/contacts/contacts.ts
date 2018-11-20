import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SearchPage} from '../search/search';
import mapWidjet from 'yandex-map-widget';
import {BasePage} from "../../shared/base.page";

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage extends BasePage {

  protected searchPage = SearchPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);
    this.initMap();
    this.disablePreloader();
  }

  initMap() {
    mapWidjet.loadApi('https://api-maps.yandex.ru/2.1/?lang=ru_RU')
      .then(() => {
        mapWidjet.createMap('map',
          [
            {
              name: 'ТГ Таир',
              lat: 49.78826531569201,
              lon: 73.10677166289035,
              site: 'http://tair.shop'
            }
          ]);
      })
      .catch(error => {
        console.log(error)
      });

  }

}
