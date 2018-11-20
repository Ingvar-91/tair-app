import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllBrandsPage } from './all-brands';

@NgModule({
  declarations: [
    AllBrandsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllBrandsPage),
  ],
})
export class AllBrandsPageModule {}
