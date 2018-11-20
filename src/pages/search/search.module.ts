import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    ImgPreloadModule
  ],
})
export class SearchPageModule {}
