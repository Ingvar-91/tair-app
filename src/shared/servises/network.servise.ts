import { Injectable } from '@angular/core';
import {AlertController, Events, NavController} from 'ionic-angular';
import { Network } from '@ionic-native/network';
import {Subscription} from "../../../node_modules/rxjs/Rx";

/*
export enum ConnectionStatusEnum {
  Online,
  Offline
}
*/

@Injectable()
export class NetworkServise {

  previousStatus;

  protected disconnectSub$: Subscription;
  protected connectSub$: Subscription;

  currentPage;

  /*alertDisconnect = this.alertCtrl.create({
    subTitle: 'Нет соединения с интернетом',
    buttons: ['Ok']
  });*/

  constructor(
    private network: Network,
    private alertCtrl: AlertController
  ) {
    //this.previousStatus = ConnectionStatusEnum.Online;


  }

  /*checkNetwork(navCtrl: NavController) {
    // NETWORK STATUS
    this.disconnectSub$ = this.network.onDisconnect().subscribe(() => {
      //this.networkCap = false;
      //this.networkStatus = false;
      this.alertDisconnect.present();
    });

    this.connectSub$ = this.network.onConnect().subscribe(() => {
      //this.networkStatus = true;
      //this.networkCap = true;
      this.alertDisconnect.dismiss();

      this.alertDisconnect = this.alertCtrl.create({
        subTitle: 'Нет соединения с интернетом',
        buttons: ['Ok']
      });
    });
    // NETWORK STATUS END
  }*/



  /*
  public initializeNetworkEvents(): void {
    let network = new Network();
    let eventCtrl = new Events();

    network.onDisconnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Online) {
        eventCtrl.publish('network:offline');
      }
      this.previousStatus = ConnectionStatusEnum.Offline;
    });
    network.onConnect().subscribe(() => {
      if (this.previousStatus === ConnectionStatusEnum.Offline) {
        eventCtrl.publish('network:online');
      }
      this.previousStatus = ConnectionStatusEnum.Online;
    });
  }
  */

  ngOnDestroy(): void {
    if(this.disconnectSub$) {
      this.disconnectSub$.unsubscribe();
    }

    if(this.connectSub$) {
      this.connectSub$.unsubscribe();
    }
  }

}
