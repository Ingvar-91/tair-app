import {Component, Input, OnInit} from '@angular/core';

/**
 * Generated class for the ImgPreloadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'img-preload',
  templateUrl: 'img-preload.html'
})
export class ImgPreloadComponent implements OnInit {

  @Input('img') targetSource: string;
  @Input('ratio') ratio: string;
  downloadingImage : any;

  imgs = {
    set: {
      'square': 'assets/preloader-400x400.gif',
      'portrait': 'assets/preloader-400x157.gif',
      'cap': 'assets/preloader-400x200.gif'
    }
  }

  img: string;
  noImg: string = 'assets/no-image-1x1.jpg';

  ngOnInit() {
    if(!this.ratio){
      this.img = this.imgs.set['square'];
    } else {
      this.img = this.imgs.set[this.ratio];
    }

    this.downloadingImage = new Image();
    this.downloadingImage.src = this.targetSource;
    this.downloadingImage.onload = () => {
      this.img = this.targetSource;
    },
    this.downloadingImage.onerror = () => {
      this.img = this.noImg;
    }
  }

}
