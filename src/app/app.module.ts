import {NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SearchPageModule} from '../pages/search/search.module';
import {ShopsPageModule} from '../pages/shops/shops.module';
import {ShopPageModule} from '../pages/shop/shop.module';
import {ProductsPageModule} from '../pages/products/products.module';
import {ProductPageModule} from '../pages/product/product.module';
import {HomePageModule} from '../pages/home/home.module';
import {CategoriesPageModule} from '../pages/categories/categories.module';
import {WishlistPageModule} from '../pages/wishlist/wishlist.module';
import {TabsPageModule} from '../pages/tabs/tabs.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShopsService} from '../shared/servises/shops.servise';
import {ProductsService} from '../shared/servises/products.servise';
import {ProductCategoriesService} from '../shared/servises/productCategories.servise';
import {HomeService} from '../shared/servises/home.servise';
import {ContactsAllPageModule} from '../pages/contacts-all/contacts-all.module';
import {ContactsService} from '../shared/servises/contacts.servise';
import {AllNoveltyPageModule} from '../pages/all-novelty/all-novelty.module';
import {AllEntPlacesPageModule} from '../pages/all-ent-places/all-ent-places.module';
import {AllTopShopPageModule} from '../pages/all-top-shop/all-top-shop.module';
import {AllBrandsPageModule} from '../pages/all-brands/all-brands.module';
import {FilterProductsPageModule} from '../pages/filter-products/filter-products.module';
import {PopoverShopPageModule} from '../pages/popover-shop/popover-shop.module';
import {DetailShopPageModule} from '../pages/detail-shop/detail-shop.module';
import {MapFloorPageModule} from '../pages/map-floor/map-floor.module';
import {ContactsPageModule} from '../pages/contacts/contacts.module';
import {AboutPageModule} from '../pages/about/about.module';
import {GalleryPageModule} from '../pages/gallery/gallery.module';
import {SearchService} from '../shared/servises/search.servise';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {PhotoService} from '../shared/servises/photo.servise';
import {AlbumDetailPageModule} from '../pages/album-detail/album-detail.module';
import {Network} from '@ionic-native/network';
import {NetworkServise} from '../shared/servises/network.servise';
import {NetworkOfflinePageModule} from '../pages/network-offline/network-offline.module';
import {CallNumber} from "@ionic-native/call-number";
import {MyShopsPageModule} from "../pages/my-shops/my-shops.module";
import {AuthServise} from "../shared/servises/auth.servise";
import {AuthPageModule} from "../pages/auth/auth.module";
import {UserShopsPageModule} from "../pages/user-shops/user-shops.module";
import {UserProductsPageModule} from "../pages/user-products/user-products.module";
import {UserProductPageModule} from "../pages/user-product/user-product.module";
import {UserShopService} from "../shared/servises/user-shops.servise";
import {UserProductsService} from "../shared/servises/user-products.servise";
import {UserProductCharsPageModule} from "../pages/user-product-chars/user-product-chars.module";
import {UserProductCategoriesPageModule} from "../pages/user-product-categories/user-product-categories.module";
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TabsPageModule,
    HomePageModule,
    SearchPageModule,
    ShopsPageModule,
    ShopPageModule,
    ProductsPageModule,
    ProductPageModule,
    CategoriesPageModule,
    WishlistPageModule,
    ContactsAllPageModule,
    AllEntPlacesPageModule,
    AllNoveltyPageModule,
    AllTopShopPageModule,
    AllBrandsPageModule,
    FilterProductsPageModule,
    PopoverShopPageModule,
    DetailShopPageModule,
    MapFloorPageModule,
    ContactsPageModule,
    AboutPageModule,
    GalleryPageModule,
    AlbumDetailPageModule,
    NetworkOfflinePageModule,
    MyShopsPageModule,
    AuthPageModule,
    UserShopsPageModule,
    UserProductsPageModule,
    UserProductPageModule,
    UserProductCharsPageModule,
    UserProductCategoriesPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShopsService,
    ProductsService,
    ProductCategoriesService,
    HomeService,
    ContactsService,
    SearchService,
    PhotoService,
    PhotoViewer,
    Network,
    NetworkServise,
    AuthServise,
    CallNumber,
    UserShopService,
    UserProductsService,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {}
