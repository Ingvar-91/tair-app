import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserShopsPage } from './user-shops';
import {ImgPreloadModule} from "../../components/img-preload/img-preload.module";

@NgModule({
  declarations: [
    UserShopsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserShopsPage),
    ImgPreloadModule,
  ],
})
export class UserShopsPageModule {}
