import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from "../../shared/base.page";
import {UserProductsService} from "../../shared/servises/user-products.servise";

/**
 * Generated class for the UserProductCategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-product-categories',
  templateUrl: 'user-product-categories.html',
})
export class UserProductCategoriesPage extends BasePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected alertCtrl: AlertController,
    public viewCtrl: ViewController,
    protected userProductsService: UserProductsService,
  ) {
    super(alertCtrl);
  }

  //categories = this.navParams.get('categories');
  categories;
  breadcrumb: string = '';

  ionViewDidLoad() {
    this.subs$[this.subs$.length] =
      this.userProductsService.getCategories()
        .subscribe((data) => {
          this.categories = data.categories;
          this.disablePreloader();
        });
  }

  onClick(item){
    if(item.child) {
      this.breadcrumb += `${item.title} > `;
      this.categories = item.child;
    } else {
      this.breadcrumb += item.title;
      this.viewCtrl.dismiss({breadcrumb: this.breadcrumb, category: item});
    }
  }

}
