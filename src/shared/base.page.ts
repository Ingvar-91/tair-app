import {OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import {environment} from '../environments/environment';
import {
  ActionSheetController, AlertController,
  Events,
  LoadingController,
  ModalController, Nav,
  NavController,
  NavParams,
  Platform, ToastController
} from 'ionic-angular';
import {ProductCategoriesService} from './servises/productCategories.servise';
import {ProductsService} from './servises/products.servise';
import {NetworkServise} from "./servises/network.servise";
import {NetworkOfflinePage} from "../pages/network-offline/network-offline";
import {Network} from "@ionic-native/network";
import {Config} from "ionic-angular/config/config";
import {App} from "ionic-angular/components/app/app";

export class BasePage implements OnDestroy {

  protected subs$: Subscription[] = [];
  public preloader:boolean = true;
  /**/
  //protected disconnectSub$: Subscription;
  //protected connectSub$: Subscription;
  //public networkStatus: boolean = true;
  //public networkCap: boolean = true;
  /**/

  protected disconnectSub$: Subscription;
  protected connectSub$: Subscription;
  protected networkBase: Network;
  protected navCtrlCurrentPage: NavController;

  alertDisconnect = this.alertCtrl.create({
    subTitle: 'Нет соединения с интернетом',
    buttons: ['Ok']
  });

  constructor(
    protected alertCtrl: AlertController
  ) {
    this.networkBase = new Network();
  }

  checkNetwork(navCtrl: NavController) {
    this.navCtrlCurrentPage = navCtrl;

    this.newtworkSubscribe();
  }

  newtworkSubscribe() {
    // NETWORK STATUS
    /*this.disconnectSub$ = this.networkBase.onDisconnect().subscribe(() => {
      this.alertDisconnect.present();
    });*/

    this.connectSub$ = this.networkBase.onConnect().subscribe(() => {
      //this.alertDisconnect.dismiss();
      //this.navCtrlCurrentPage.setRoot(this.navCtrlCurrentPage.getActive().component);

      const component = this.navCtrlCurrentPage.getActive().instance;
      if (component.ionViewDidLoad) {
        component.ionViewDidLoad();
      }

    });
    // NETWORK STATUS END
  }

  ionViewDidLeave() {
    if(this.disconnectSub$) {
      this.disconnectSub$.unsubscribe();
    }

    if(this.connectSub$) {
      this.connectSub$.unsubscribe();
    }
  }

  ionViewDidEnter() {
    this.newtworkSubscribe();
  }

  ngOnDestroy(): void {
    this.subs$.forEach((subscription) => {
      if(subscription) {
        subscription.unsubscribe();
      }
    });

    if(this.disconnectSub$) {
      this.disconnectSub$.unsubscribe();
    }

    if(this.connectSub$) {
      this.connectSub$.unsubscribe();
    }

  }

  errorImage(event) {
    event.target.src = environment.imgNotFound;
  }

  disablePreloader() {
    this.preloader = false;
  }

}
