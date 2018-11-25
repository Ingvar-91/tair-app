import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from "../../shared/base.page";

/**
 * Generated class for the UserProductCharsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-product-chars',
  templateUrl: 'user-product-chars.html',
})
export class UserProductCharsPage extends BasePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected alertCtrl: AlertController,
    public viewCtrl: ViewController,
  ) {
    super(alertCtrl);
  }

  chars = this.navParams.get('chars');
  charArr = [];

  ionViewDidLoad() {
    console.log(this.chars);
  }

  onClick(): void {
    let chars = this.chars;
    let charArr = Object.keys(this.charArr);
    let selected = [];
    if(chars.child) {
      for (let child of chars.child) {
        child.check = false;
      }

      for (let child of chars.child) {
        for (let id of charArr) {
          if(child.id == id){
            child.check = true;
            selected.push(child.title);
          }
        }
      }
    }

    this.viewCtrl.dismiss({chars:chars, selected: selected.join(', ')});
  }

  clear(): void{
    let chars = this.chars;
    for (let child of chars.child) {
      child.check = false;
    }
    this.viewCtrl.dismiss({chars:chars, selected: ''});
  }

  /*
  checked(event, item): void {
    if(!item.check){
      item.check = true;
    } else {
      item.check = false;
    }
  }
  */



}
