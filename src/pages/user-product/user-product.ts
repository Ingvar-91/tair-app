import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import {BasePage} from "../../shared/base.page";
import {UserProductsService} from "../../shared/servises/user-products.servise";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchPage} from "../search/search";
import {UserProductCategoriesPage} from "../user-product-categories/user-product-categories";
import {UserProductCharsPage} from "../user-product-chars/user-product-chars";
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the UserProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-product',
  templateUrl: 'user-product.html',
})
export class UserProductPage extends BasePage  {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    protected alertCtrl: AlertController,
    protected userProductsService: UserProductsService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    private camera: Camera,

  ) {
    super(alertCtrl);
  }

  form: FormGroup = new FormGroup({
    'title': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'text': new FormControl('')
  });
  protected searchPage = SearchPage;
  params = this.navParams.get('params');
  product;
  categories;
  productData: ProductData = {
    title: null,
    text: null,
    category_id: null,
    chars: []
  };
  breadcrumb;
  chars;
  base64Image: string;

  ionViewDidLoad() {
    this.checkNetwork(this.navCtrl);

    if(this.params && this.params.product){
      this.subs$[this.subs$.length] =
        this.userProductsService.getUserProduct(
          this.params.product.id
        )
          .subscribe((data) => {
            if(data) {
              this.product = data.product;
              this.categories = data.categories;

              this.form.setValue({
                title: this.product.title,
                text: this.product.text,
              });
            }

            this.disablePreloader();
          });
    } else {
      this.disablePreloader();
    }

  }

  showCamera() {

    const options: CameraOptions = {
      quality: 100,
      /*destinationType: this.camera.DestinationType.FILE_URI,*/
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      //console.log(imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });

  }

  save() {
    this.productData.title = this.form.get('title').value;
    this.productData.text = this.form.get('title').value;

    console.log(this.productData);

  }

  showCategories() {
    let modal = this.modalCtrl.create(UserProductCategoriesPage, {categories: this.categories}, {
      cssClass: "modal-full-screen"
    });
    modal.present();

    modal.onDidDismiss(data => {
      let loading = this.loadingCtrl.create({
        content: 'Пожалуйста подождите...'
      });
      loading.present();

      if(data && data.category){
        this.productData.category_id = data.category.id;
        this.breadcrumb = data.breadcrumb;

        this.subs$[this.subs$.length] =
          this.userProductsService.getCharsProduct(
            this.productData.category_id
          )
          .subscribe((data) => {
            this.chars = data;

            loading.dismiss();
          });
      }
    });
  }

  showChars(item) {
    let modal = this.modalCtrl.create(UserProductCharsPage, {chars: item}, {
      cssClass: "modal-full-screen"
    });
    modal.present();

    modal.onDidDismiss(data => {
      if(data && data.chars && data.chars.length) {
        const chars = data.chars;
        this.productData.chars.push(chars);

        let selected = [];
        for (let child of item.child) {
          for (let id of chars) {
            if (child.id == id) {
              selected.push(child.title);
            }
          }
        }
        item.selected = selected.join(', ');
      }
    });
  }

}

interface ProductData {
  title: string;
  text: string;
  category_id: number;
  chars: number[];
}
