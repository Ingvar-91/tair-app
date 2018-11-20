import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactsAllPage } from './contacts-all';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    ContactsAllPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactsAllPage),
    ImgPreloadModule
  ],
})
export class ContactsAllPageModule {}
