import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { IBeacon } from '@ionic-native/ibeacon';
import _ from 'lodash';

//The problem is that the proximity and distance is no longer the same as in the last app. Needs to be based on RSSI
@Component({
  selector: 'page-tour',
  templateUrl: 'tour.html',
  providers: [IBeacon]
})
export class TourPage {

  rangedBeacons: Array<any>
  closestBeacon: any
  ibeaconInfo: any
  selectedBeaconInfo: any

  constructor(public navCtrl: NavController, private ibeacon: IBeacon) {
    //move this to an imported data set afterwars
    this.ibeaconInfo = [
      {
        id: 486,
        color: "Mint",
        location: "The Boss's Office",
        beaconImg: "img/beaconContent/mint.png",
        description: "<br />Where the boss sits! <br /><br />The boss takes a seat behind this desk for a short period of time during the working week. Project's are managed, and business is won for indigoRiver right here.",
        roomImg: "img/beaconContent/boss.jpg",
        roomVid: ""

      },
      {
        id: 649,
        color: "Ice",
        location: "The Studio",
        beaconImg: "img/beaconContent/ice.png",
        description: "<br />Where the magic happens! <br /><br />Here you will find the innovators, creators, thinkers and challengers that are dedicated to delivering first hand knowledge and expertise to all of our amazign clients.",
        roomImg: "",
        roomVid: "img/beaconContent/studio.mp4"
      },
      {
        id: 167,
        color: "Blueberry",
        location: "The Board Room",
        beaconImg: "img/beaconContent/blueberry.png",
        description: "<br />Where the projects are born! <br /><br />A room where great client meetings take place, and staff are only summoned to when they've been misbehaving.",
        roomImg: "",
        roomVid: "img/beaconContent/boardroom.mp4"
      }
    ]


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TourPage');
    // Request permission to use location on iOS
    this.ibeacon.requestAlwaysAuthorization();
    // create a new delegate and register it with the native layer
    let delegate = this.ibeacon.Delegate();
    let beaconRegion = this.ibeacon.BeaconRegion('indigoOffice','B9407F30-F5F8-466E-AFF9-25556B57FE6D');

    this.ibeacon.startRangingBeaconsInRegion(beaconRegion)
      .then(
        () => console.log('Native layer recieved the request to ranging'),
        error => console.error('Native layer failed to begin ranging: ', error)
      )

    delegate.didRangeBeaconsInRegion()
      .subscribe(
        data => this.beaconDetected(data),
        error => console.error()
      )

  }

  beaconDetected(beaconArray) {
    let orderedBeacons = _.sortBy(beaconArray.beacons, [function(o){
      return o.accuracy
    }]).reverse()
    this.closestBeacon = orderedBeacons[0]
    this.getBeaconInfo()
  }

  getBeaconInfo() {
    let selectedBeaconInfo = _.find(this.ibeaconInfo, 'id', this.closestBeacon.id);
    console.log(selectedBeaconInfo)
  }

  exitTour() {
    this.navCtrl.pop()
  }
}
