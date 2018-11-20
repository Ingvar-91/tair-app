import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {ProductsService} from '../../shared/servises/products.servise';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {SearchPage} from '../search/search';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage extends BasePage  {

  constructor(
    public viewCtrl: ViewController,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  protected searchPage = SearchPage;
  slider1: object[] = [
    {'img': 'assets/about/_DSC4660.jpg'},
    {'img': 'assets/about/_DSC4663.jpg'},
    {'img': 'assets/about/_DSC4679.jpg'},
    {'img': 'assets/about/_DSC4704.jpg'}
  ];

  shops: object[] = [
    {'img': 'assets/about/_DSC4371.jpg', title: 'Дисконт-центр «O’stin»'},
    {'img': 'assets/about/_DSC4373.jpg', title: 'Магазин обуви «Юничел»'},
    {'img': 'assets/about/_DSC4375.jpg', title: 'Дисконт-центр «Adidas & Reebok»'},
    {'img': 'assets/about/_DSC4377.jpg', title: 'Супермаркет детских товаров «Еркемай»'},
    {'img': 'assets/about/_DSC4378.jpg', title: 'Дисконт-центр «Спортмастер»'},
    {'img': 'assets/about/_DSC4381.jpg', title: 'Магазин средиземноморской одежды «DeFacto»'},
    {'img': 'assets/about/_DSC4383.jpg', title: 'Магазин бытовой техники «Sulpak»'},
    {'img': 'assets/about/_DSC4384.jpg', title: 'Магазин цифровой техники «Alser»'},
    {'img': 'assets/about/_DSC4385.jpg', title: 'Супермаркет посуды «Luminarc»'},
    {'img': 'assets/about/_DSC4386.jpg', title: 'Супермаркет «Южный»'},
    {'img': 'assets/about/_DSC4430.jpg', title: 'Магазин обуви «Kari»'},
    {'img': 'assets/about/_DSC4432.jpg', title: 'Магазин обуви «FLO»'},
    {'img': 'assets/about/_DSC4760.jpg', title: '«ADA Textile»'},
    {'img': 'assets/about/_DSC4763.jpg', title: '«Центр правильного сна»'},
    {'img': 'assets/about/_DSC4764.jpg', title: 'Магазин одежды «KOTON»'},
    {'img': 'assets/about/_DSC4765.jpg', title: 'Супермаркет детских товаров «Кенгуру»'},
    {'img': 'assets/about/_DSC4769.jpg', title: 'Магазин одежды «УниверMAG.kz»'},
  ];

  ionViewDidLoad() {

  }


}
