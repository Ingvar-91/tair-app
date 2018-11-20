import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    ImgPreloadModule
  ],
})
export class AboutPageModule {}
