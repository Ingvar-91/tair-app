import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllEntPlacesPage } from './all-ent-places';
import {ImgPreloadModule} from '../../components/img-preload/img-preload.module';

@NgModule({
  declarations: [
    AllEntPlacesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllEntPlacesPage),
    ImgPreloadModule
  ],
})
export class AllEntPlacesPageModule {}
