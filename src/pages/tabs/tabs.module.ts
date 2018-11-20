import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TabsPage} from './tabs';
import {CategoriesPage} from '../categories/categories';
import {ProductsPage} from '../products/products';
import {ShopsPage} from '../shops/shops';
import {HomePage} from '../home/home';
import {ProductsPageModule} from '../products/products.module';
import {ShopPageModule} from '../shop/shop.module';
import {CategoriesPageModule} from '../categories/categories.module';
import {HomePageModule} from '../home/home.module';

@NgModule({
  declarations: [
    TabsPage
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
  ],
})
export class TabsPageModule {}
