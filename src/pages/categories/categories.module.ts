import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    CategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriesPage),
    ImgPreloadModule,
  ],
})
export class CategoriesPageModule {}
