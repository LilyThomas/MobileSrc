import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {OverviewPage} from "../overview/overview";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  overviewpage=OverviewPage;

  id:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.id = navParams.get('id');
  }

  returnToOverview(){
    this.navCtrl.setRoot(this.overviewpage, {id: this.id});
  }
}
