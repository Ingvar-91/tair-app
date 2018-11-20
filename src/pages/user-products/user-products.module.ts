import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductsPage } from './user-products';
import {ImgPreloadModule} from "../../components/img-preload/img-preload.module";

@NgModule({
  declarations: [
    UserProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductsPage),
    ImgPreloadModule,
  ],
})
export class UserProductsPageModule {}
