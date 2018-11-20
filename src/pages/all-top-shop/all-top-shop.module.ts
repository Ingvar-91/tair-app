import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllTopShopPage } from './all-top-shop';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    AllTopShopPage,
  ],
  imports: [
    IonicPageModule.forChild(AllTopShopPage),
    ImgPreloadModule
  ],
})
export class AllTopShopPageModule {}
