import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserProductCategoriesPage } from './user-product-categories';
import {ImgPreloadModule} from "../../components/img-preload/img-preload.module";

@NgModule({
  declarations: [
    UserProductCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserProductCategoriesPage),
    ImgPreloadModule,
  ],
})
export class UserProductCategoriesPageModule {}
