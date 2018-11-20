import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HomePage} from './home';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';
import {NetworkCapModule} from "../../components/network-cap/network-cap.module";

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ImgPreloadModule,
    NetworkCapModule,
  ],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule {}
