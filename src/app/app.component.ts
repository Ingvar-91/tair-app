import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertController, Events, ModalController, Nav, NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {ContactsAllPage} from '../pages/contacts-all/contacts-all';
import {MapFloorPage} from '../pages/map-floor/map-floor';
import {AboutPage} from '../pages/about/about';
import {ContactsPage} from '../pages/contacts/contacts';
import {GalleryPage} from '../pages/gallery/gallery';
import {Network} from "@ionic-native/network";
import {Subscription} from "rxjs/Subscription";
import {AuthServise} from "../shared/servises/auth.servise";
import {UserShopsPage} from "../pages/user-shops/user-shops";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {

  rootPage:any = TabsPage;

  protected disconnectSub$: Subscription;
  protected connectSub$: Subscription;
  networkMessage: boolean = false;

  alertDisconnect = this.alertDisconnectCreate();

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    public events: Events,
    private network: Network,
    private alertCtrl: AlertController,
    private authServise: AuthServise,
  ){
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.disconnectSub$ = this.network.onDisconnect().subscribe(() => {
        this.alertDisconnect.present();
      });

      this.connectSub$ = this.network.onConnect().subscribe(() => {
        this.alertDisconnect.dismiss();
        this.alertDisconnect = this.alertDisconnectCreate();
      });

      this.user();
    });
  }

  async user() {
    this.authServise.getUser()
      .subscribe((data) => {
        this.authServise.user = data.user;
        this.authServise.auth = true;
      },err => {
        console.log(err);
        this.authServise.auth = false;
      },() => {});
  }

  ngOnDestroy(): void {
    if(this.disconnectSub$) {
      this.disconnectSub$.unsubscribe();
    }

    if(this.connectSub$) {
      this.connectSub$.unsubscribe();
    }
  }

  alertDisconnectCreate() {
    return this.alertCtrl.create({
      subTitle: 'Нет соединения с интернетом',
      buttons: ['Ok']
    });
  }

  showAllContacts() {
    let modal = this.modalCtrl.create(ContactsAllPage, null, {
      cssClass: "modal-full-screen"
    });
    modal.present();
  }

  showMapFloor() {
    let modal = this.modalCtrl.create(MapFloorPage, null, {
      cssClass: "modal-full-screen"
    });
    modal.present();
  }

  showAboutPage() {
    let modal = this.modalCtrl.create(AboutPage, null, {
      cssClass: "modal-full-screen"
    });
    modal.present();
  }

  showContactsPage() {
    let modal = this.modalCtrl.create(ContactsPage, null, {
      cssClass: "modal-full-screen"
    });
    modal.present();
  }

  showGalleryPage() {
    let modal = this.modalCtrl.create(GalleryPage, null, {
      cssClass: "modal-full-screen"
    });
    modal.present();
  }

  showUserShopsPage() {
    let modal = this.modalCtrl.create(UserShopsPage, null, {
      cssClass: "modal-full-screen"
    });
    modal.present();
  }
}
