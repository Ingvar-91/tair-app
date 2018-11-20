import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsPage),
    ImgPreloadModule
  ],
})
export class ProductsPageModule {}
