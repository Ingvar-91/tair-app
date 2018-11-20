import { Component } from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, ViewController} from 'ionic-angular';
import {ContactsService} from '../../shared/servises/contacts.servise';
import {BasePage} from '../../shared/base.page';
import {SearchPage} from '../search/search';
import {CallNumber} from "@ionic-native/call-number";

/**
 * Generated class for the ContactsAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts-all',
  templateUrl: 'contacts-all.html',
})
export class ContactsAllPage extends BasePage  {

  contacts;
  path: string;
  protected searchPage = SearchPage;

  constructor(
    public viewCtrl: ViewController,
    private contactsService: ContactsService,
    public actionSheetCtrl: ActionSheetController,
    private callNumber: CallNumber,
    protected alertCtrl: AlertController,
    public navCtrl: NavController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.contactsService.getAllNumbers()
      .subscribe((data) => {
        this.contacts = data.contacts;
        this.path = data.path;

        this.disablePreloader();
      });
  }

  onClick(item) {
    if(item.phones.length > 1) {
      const buttons = [];
      for (let phone of item.phones) {
        buttons[buttons.length] = {
          text: phone,
          icon: 'call',
          handler: () => {
            this.call(phone);

            //this.callNumber.callNumber (String(phone), true)
            //window.location.href='tel://'+phone;
          }
        }
      }
      const actionSheet = this.actionSheetCtrl.create({
        title: 'Выберите номер',
        buttons: buttons
      });
      actionSheet.present();
    } else {
      //this.callNumber.callNumber (String(item.phones[0]), true)
      this.call(item.phones[0]);
      /*window.open('tel:'+item.phones[0]);*/
      //window.location.href='tel://'+item.phones[0];
    }
  }

  async call(number: any) {
    this.callNumber.callNumber(String(number), true);
  }

  onClickSort(item) {

  }

}
