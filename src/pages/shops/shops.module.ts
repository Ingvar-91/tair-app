import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopsPage } from './shops';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';
import {NetworkCapModule} from "../../components/network-cap/network-cap.module";

@NgModule({
  declarations: [
    ShopsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopsPage),
    ImgPreloadModule,
    NetworkCapModule,
  ],
})
export class ShopsPageModule {}
