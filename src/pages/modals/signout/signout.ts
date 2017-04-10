import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CheckInService } from '../../../services/checkInService';

@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html',
  providers: [CheckInService]
})
export class SignOutPage {

  checkedInPeople: string[];

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public alertCtrl: AlertController, public checkInService: CheckInService) {
    this.checkedInPeople = []
  }

  ionViewDidEnter() {
    this.checkInService.getCheckins()
      .subscribe( result => {
        if(result.response){
          this.checkedInPeople = result.response
        }else{

        }
      })
  }

  signOut(user) {
    this.checkInService.signOut(user)
      .subscribe(
        result => {
          if(result){
            this.dismiss()
            let alert = this.alertCtrl.create({
              title: 'Goodbye, '+user.first_name+'!',
              subTitle: 'You have been signed out.',
              buttons: ['OK']
            });
            alert.present();
          }
        })
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
