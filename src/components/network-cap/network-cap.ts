import {Component, Input} from '@angular/core';

/**
 * Generated class for the NetworkCapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'network-cap',
  templateUrl: 'network-cap.html'
})
export class NetworkCapComponent {

  @Input('networkCap') networkCap: boolean;
  @Input('networkStatus') networkStatus: boolean;
  @Input('currentClass') currentClass;

  constructor() {
    /*
      setTimeout(() => {
        this.networkStatus = true;
      }, 3000);


      setTimeout(() => {
        this.networkCap = false;
        this.networkStatus = false;
      }, 6000);
    */
  }

  onClick() {
    this.networkCap = true;
    this.currentClass.init();
  }

}
