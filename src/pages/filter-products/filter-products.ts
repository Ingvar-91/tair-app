import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the FilterProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-products',
  templateUrl: 'filter-products.html',
})
export class FilterProductsPage {

  /*originalPrice = this.navParams.get('originalPrice');*/
  /*originalPrice = JSON.parse(sessionStorage.getItem('originalPrice'));*/
  price = this.navParams.get('price');
  filterData = this.navParams.get('filterData');
  range = {lower: this.price.min, upper: this.price.max};
  newFilterData = {
    'price': {},
    'chars': ''
  };

  constructor(
    private navParams: NavParams,
    public viewCtrl: ViewController,
  ) {}

  onClickFilter() {
    /*
    if((this.price.min != this.range.lower) || (this.price.max != this.range.upper)) {
      this.newFilterData.price = {min: this.range.lower, max: this.range.upper};
    }
    */

    this.newFilterData.chars = this.filterData.chars;
    this.viewCtrl.dismiss(this.newFilterData);
  }

  ionViewDidLoad() {

  }

  onClearFilter() {
    /*
    this.price.min = this.originalPrice.min;
    this.price.max = this.originalPrice.max;

    this.range.lower = this.originalPrice.min;
    this.range.upper = this.originalPrice.max;
    */

    this.filterData.chars.forEach(function(char) {
      char.selected = false;
      for (let child of char.child) {
        child.check = false;
      }
    });
  }

}
