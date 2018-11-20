import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {NetworkCapComponent} from "./network-cap";

@NgModule({
  declarations: [
    NetworkCapComponent
  ],
  imports: [
    IonicPageModule.forChild(NetworkCapComponent),
  ],
  exports: [
    NetworkCapComponent,
  ]
})
export class NetworkCapModule {}
