import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { CheckInService } from '../../services/checkInService';

import { SignOutPage } from '../modals/signout/signout';

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html'
})
export class CheckInPage {

  fName: any;
  lName: any;
  email: any;
  company: any;

  constructor(public navCtrl: NavController, public checkInService: CheckInService, public alertCtrl: AlertController, public modalCtrl: ModalController) {

  }

  checkIn() {
    this.checkInService.checkIn(this.fName, this.lName, this.email, this.company)
      .subscribe(
        result => {
          let alert = this.alertCtrl.create({
            title: `Welcome, `+this.fName+`!`,
            subTitle: `You're signed in`,
            buttons: ['Sweet']
          });
          alert.present();
      }, error => {

      })
  }

  openSignOut() {
    let modal = this.modalCtrl.create(SignOutPage);
    modal.present();


  }

}
