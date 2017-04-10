import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { CheckInPage } from '../checkin/checkin';
import { TourIntroPage } from '../modals/tourIntro/tourintro';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  goToCheckIn() {
    this.navCtrl.push(CheckInPage);
  }
  goToTour() {
    let modal = this.modalCtrl.create(TourIntroPage);
    modal.present();
  }

}
