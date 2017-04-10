import { Component } from '@angular/core';

import { ViewController, NavController } from 'ionic-angular';

import { TourPage } from '../../tour/tour';

@Component({
  selector: 'page-tour',
  templateUrl: 'tourintro.html'
})
export class TourIntroPage {


  constructor(private viewCtrl: ViewController, public navCtrl: NavController) {

  }

  openTour() {
    this.dismiss()
    this.navCtrl.push(TourPage)
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
