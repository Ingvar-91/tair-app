import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyShopsPage } from './my-shops';
import {ImgPreloadModule} from "../../components/img-preload/img-preload.module";

@NgModule({
  declarations: [
    MyShopsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyShopsPage),
    ImgPreloadModule,
  ],
})
export class MyShopsPageModule {}
