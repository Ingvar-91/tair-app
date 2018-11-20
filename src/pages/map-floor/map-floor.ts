import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {HomePage} from '../home/home';
import {environment} from '../../environments/environment';
import {SearchPage} from '../search/search';
import {PhotoViewer} from "@ionic-native/photo-viewer";

/**
 * Generated class for the MapFloorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map-floor',
  templateUrl: 'map-floor.html',
})
export class MapFloorPage extends BasePage {

  environment = environment;
  segmentPage:string = 'witchOne';
  protected searchPage = SearchPage;

  constructor(
    public viewCtrl: ViewController,
    protected alertCtrl: AlertController,
    public navCtrl: NavController,
    private photoViewer: PhotoViewer,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);
  }

  onClick(item) {
    this.photoViewer.show(item);
  }

}
