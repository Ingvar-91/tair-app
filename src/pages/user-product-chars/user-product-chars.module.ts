import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductCharsPage } from './user-product-chars';
import {ImgPreloadModule} from "../../components/img-preload/img-preload.module";

@NgModule({
  declarations: [
    UserProductCharsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductCharsPage),
    ImgPreloadModule,
  ],
})
export class UserProductCharsPageModule {}
