import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailShopPage } from './detail-shop';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    DetailShopPage
  ],
  imports: [
    IonicPageModule.forChild(DetailShopPage),
    ImgPreloadModule
  ],
})
export class DetailShopPageModule {}
