import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  LoadingController,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {ProductPage} from '../product/product';
import {ProductsService} from '../../shared/servises/products.servise';
import {ProductCategoriesService} from '../../shared/servises/productCategories.servise';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {FilterProductsPage} from '../filter-products/filter-products';
import {SearchPage} from '../search/search';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage extends BasePage {

  item: Products[] = [];
  products: any[];
  page = ProductPage;
  pageNum = 1;
  params = this.navParams.get('params');
  infiniteScroll;
  sort: string = 'new';
  sortArr = [
    {'title': 'По популярности', sort: 'rating', icon: 'flame'},
    {'title': 'По возрастанию цены', sort: 'price', icon: 'arrow-dropup-circle'},
    {'title': 'По убыванию цены', sort: '-price', icon: 'arrow-dropdown-circle'},
    {'title': 'По новинкам', sort: 'new', icon: 'warning'},
    {'title': 'По скидкам', sort: 'discount', icon: 'pricetags'}
  ];
  filterData;
  filterChar = '';
  price: any = {min:0, max:0};
  protected originalPrice = {};
  protected searchPage = SearchPage;

  constructor(
    private navParams: NavParams,
    private productsService: ProductsService,
    private productCategoriesService: ProductCategoriesService,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    protected alertCtrl: AlertController,
  ){
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      forkJoin(
        this.productCategoriesService.getById(
          this.params.category_id
        ),
        this.productsService.getProductsByCategory(
          this.params.category_id,
          this.pageNum,
          this.sort,
          this.filterChar,
          this.price.min+','+this.price.max
        )
      )
      .subscribe((data) => {
        this.item = data[0];
        this.products = data[1].products.data;

        /*
        this.price.min = data[1].priceMin;
        this.price.max = data[1].priceMax;
        */

        /*sessionStorage.setItem('originalPrice', JSON.stringify(this.price));*/

        this.filterData = {
          chars: data[1].filter
        }

        this.disablePreloader();


      });
  }

  /*загрузка данных при скролле до конца*/
  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.pageNum = ++this.pageNum;

    this.subs$[this.subs$.length] =
      this.productsService.getProductsByCategory(
        this.params.category_id,
        this.pageNum,
        this.sort,
        this.filterChar,
        /*this.price.min+','+this.price.max*/
      )
      .subscribe((data) => {
        if (data.products.data.length) {
          this.products.push(...data.products.data);
          this.infiniteScroll.complete();
        } else {
          this.infiniteScroll.enable(false);
        }
      });
  }

  /* обновление */
  doRefresh(refresher) {
    this.pageNum = 1;
    this.sort = 'new';
    this.price = '';
    this.subs$[this.subs$.length] =
      this.productsService.getProductsByCategory(
        this.params.category_id,
        this.pageNum,
        this.sort
      )
      .subscribe((data) => {
        /*
        this.price.min = data.priceMin;
        this.price.max = data.priceMax;
        */

        this.products = data.products.data;
        refresher.complete();
        if(this.infiniteScroll) this.infiniteScroll.enable(true);
      });
  }

  /*сортировка*/
  onClickSort(item) {
    const buttons = [];
    for (let item of this.sortArr) {
      buttons[buttons.length] = {
        text: item.title,
        icon: item.icon,
        handler: () => {
          /*loading start*/
          let loading = this.loadingCtrl.create({
            content: 'Идет загрузка...'
          });
          loading.present();
          /*loading end*/

          this.sort = item.sort;
          this.subs$[this.subs$.length] =
            this.productsService.getProductsByCategory(
              this.params.category_id,
              this.pageNum,
              this.sort,
              this.filterChar,
              /*this.price.min+','+this.price.max*/
            )
            .subscribe((data) => {
              this.products = data.products.data;
              loading.dismiss();
            });
        }
      }
    }

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Сортировка',
      buttons: buttons
    });
    actionSheet.present();
  }

  /*фильтр*/
  onClickFilter() {
    /*loading start*/
    let loading = this.loadingCtrl.create({
      content: 'Идет загрузка...'
    });
    loading.present();
    /*loading end*/

    /* открыть модальное окно фильтра */
    let modal = this.modalCtrl.create(FilterProductsPage, {
      filterData: this.filterData,
      price: this.price,
    });
    modal.onDidDismiss(data => {
      let filterCharIds = [];
      if(data){
        if(data['chars'] && data['chars'].length) {
          for (let char of data.chars) {
            for (let child of char.child) {
              if(child.check == true) {
                filterCharIds[filterCharIds.length] = child.id;
              }
            }
          }
          this.filterChar = filterCharIds.join(',');
        }

        if (data['price']) {
          /*
          this.filterData.priceMin = data.price.min;
          this.filterData.priceMax = data.price.max;
          this.price.min = data.price.min;
          this.price.max = data.price.max;
          */
        }

        this.subs$[this.subs$.length] =
          this.productsService.getProductsByCategory(
            this.params.category_id,
            this.pageNum,
            this.sort,
            this.filterChar,
            /*this.price.min+','+this.price.max*/
          )
          .subscribe((data) => {
            this.products = data.products.data;
            loading.dismiss();
          });
      } else {
        loading.dismiss();
      }
    });
    modal.present();
  }

  onClick(item) {
    this.navCtrl.push(ProductPage, {params: {product_id: item.id}});
  }
}
