import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkOfflinePage } from './network-offline';

@NgModule({
  declarations: [
    NetworkOfflinePage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkOfflinePage),
  ],
})
export class NetworkOfflinePageModule {}
