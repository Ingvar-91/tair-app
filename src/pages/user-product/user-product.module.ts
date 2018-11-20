import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductPage } from './user-product';
import {ImgPreloadModule} from "../../components/img-preload/img-preload.module";

@NgModule({
  declarations: [
    UserProductPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductPage),
    ImgPreloadModule,

  ],
})
export class UserProductPageModule {}
