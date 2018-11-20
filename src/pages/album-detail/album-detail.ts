import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BasePage} from '../../shared/base.page';
import {PhotoService} from '../../shared/servises/photo.servise';
import {PhotoViewer} from '@ionic-native/photo-viewer';

/**
 * Generated class for the AlbumDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-album-detail',
  templateUrl: 'album-detail.html',
})
export class AlbumDetailPage extends BasePage {

  params = this.navParams.get('params');
  items: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private photoService: PhotoService,
    private photoViewer: PhotoViewer,
    protected alertCtrl: AlertController,
  ) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    this.subs$[this.subs$.length] =
      this.photoService.getPhotosAlbum(
        this.params.id
      )
      .subscribe((data) => {
        this.items = data;

        this.disablePreloader();
      });
  }

  /* обновление */
  doRefresh(refresher) {
    this.subs$[this.subs$.length] =
      this.photoService.getPhotosAlbum(
        this.params.id
      )
      .subscribe((data) => {
        this.items = data;
        refresher.complete();
      });
  }

  onClick(item) {
    this.photoViewer.show(item.photo_807);
  }

}
