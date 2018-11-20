import {Component, OnDestroy} from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import { SearchService } from '../../shared/servises/search.servise';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {Subscription} from '../../../node_modules/rxjs';
import {merge} from 'rxjs/observable/merge';
import {ProductPage} from '../product/product';
import {BasePage} from '../../shared/base.page';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage extends BasePage implements OnDestroy {

  constructor(
    private searchService: SearchService,
    public navCtrl: NavController,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  items;
  protected sub1$: Subscription;
  protected sub2$: Subscription;
  pageNum: number = 1;
  infiniteScroll;

  form = new FormGroup({
    'search': new FormControl('')
  });

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      merge(
        this.form.get('search').valueChanges.pipe(
          debounceTime(600)
        )
      )
      .startWith({})
      .switchMap(() => {
        return this.searchService.search(
          this.form.get('search').value,
          this.pageNum
        );
      })
      .subscribe((data) => {
        if(data.data.length) {
          this.items = data.data;
        }

        this.disablePreloader();
      });
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.pageNum = ++this.pageNum;

    this.subs$[this.subs$.length] =
      this.searchService.search(
        this.form.get('search').value,
        this.pageNum
      )
      .subscribe((data) => {
        if (data.data.length) {
          this.items.push(...data.data);
          this.infiniteScroll.complete();
        } else {
          this.infiniteScroll.enable(false);
        }
      });
  }

  /* обновление */
  doRefresh(refresher) {
    this.pageNum = 1;

    this.subs$[this.subs$.length] =
      this.searchService.search(
        this.form.get('search').value,
        this.pageNum
      )
      .subscribe((data) => {
        this.items = data.data;
        refresher.complete();
        if(this.infiniteScroll) this.infiniteScroll.enable(true);
      });
  }

  onInput(event) {
    if(!this.form.get('search').value){
      this.items = [];
    }
  }

  onClick(item){
    this.navCtrl.push(ProductPage, {params: {product_id: item.id}});
  }


}
