import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HomeService} from '../../shared/servises/home.servise';
import {BasePage} from '../../shared/base.page';
import {SearchPage} from '../search/search';

/**
 * Generated class for the AllBrandsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-brands',
  templateUrl: 'all-brands.html',
})
export class AllBrandsPage extends BasePage {

  items:any;
  protected searchPage = SearchPage;

  constructor(
    private homeService: HomeService,
    protected alertCtrl: AlertController,
    public navCtrl: NavController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.homeService.getAllBrands()
      .subscribe((data) => {
        this.items = data;

        this.disablePreloader();
      });
  }

}
