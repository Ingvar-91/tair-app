import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ImgPreloadComponent} from './img-preload';

@NgModule({
  declarations: [
    ImgPreloadComponent
  ],
  imports: [
    IonicPageModule.forChild(ImgPreloadComponent),
  ],
  exports: [
    ImgPreloadComponent,
  ]
})
export class ImgPreloadModule {}
