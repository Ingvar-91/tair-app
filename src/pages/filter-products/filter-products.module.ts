import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterProductsPage } from './filter-products';

@NgModule({
  declarations: [
    FilterProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterProductsPage),
  ],
})
export class FilterProductsPageModule {}
