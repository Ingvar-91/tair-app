import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllNoveltyPage } from './all-novelty';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    AllNoveltyPage,
  ],
  imports: [
    IonicPageModule.forChild(AllNoveltyPage),
    ImgPreloadModule
  ],
})
export class AllNoveltyPageModule {}
