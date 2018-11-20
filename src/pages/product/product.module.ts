import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    ProductPage
  ],
  exports: [],
  imports: [
    IonicPageModule.forChild(ProductPage),
    ImgPreloadModule
  ],
})
export class ProductPageModule {}
