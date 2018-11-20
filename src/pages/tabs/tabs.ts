import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import {ShopsPage} from '../shops/shops';
import {CategoriesPage} from '../categories/categories';
import {AuthPage} from "../auth/auth";
import {UserProductPage} from "../user-product/user-product";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoriesPage;
  tab3Root = ShopsPage;
  //tab4Root = AuthPage;
  tab4Root = UserProductPage;

}
