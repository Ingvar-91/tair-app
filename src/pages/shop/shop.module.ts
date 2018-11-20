import { NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopPage } from './shop';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    ShopPage
  ],
  imports: [
    IonicPageModule.forChild(ShopPage),
    ImgPreloadModule
  ]
})
export class ShopPageModule {}
