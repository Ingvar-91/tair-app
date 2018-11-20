import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SearchPage} from '../search/search';
import {HomeService} from '../../shared/servises/home.servise';
import {PhotoService} from '../../shared/servises/photo.servise';
import {BasePage} from '../../shared/base.page';
import {ProductPage} from '../product/product';
import {AlbumDetailPage} from '../album-detail/album-detail';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage extends BasePage  {

  protected searchPage = SearchPage;
  private offset:number = 0;
  items: any[];
  infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private photoService: PhotoService,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.photoService.getAllAlbum(
        this.offset
      )
      .subscribe((data) => {
        this.items = data;

        this.disablePreloader();
      });
  }

  /* обновление */
  doRefresh(refresher) {
    this.offset = 0;
    this.subs$[this.subs$.length] =
      this.photoService.getAllAlbum(
        this.offset
      )
      .subscribe((data) => {
        this.items = data;
        refresher.complete();
        if(this.infiniteScroll) this.infiniteScroll.enable(true);
      });
  }

  /*загрузка данных при скролле до конца*/
  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.offset = this.offset + 12;

    this.subs$[this.subs$.length] =
      this.photoService.getAllAlbum(
        this.offset
      )
      .subscribe((data) => {
        if (data.length) {
          this.items.push(...data);
          this.infiniteScroll.complete();
        } else {
          this.infiniteScroll.enable(false);
        }
      });
  }

  onClick(item) {
    this.navCtrl.push(AlbumDetailPage, {params: {id: item.id}});
  }

}
