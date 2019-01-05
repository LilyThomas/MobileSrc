import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {OverviewPage} from "../overview/overview";
import {ProfilePage} from "../profile/profile";

@IonicPage()
@Component({
  selector: 'page-editinfo',
  templateUrl: 'editinfo.html'
})
export class EditinfoPage {

  profilepage=ProfilePage;

  constructor(
    public navCtrl: NavController,
  ) {}

  saveInfo(){
    this.navCtrl.setRoot(this.profilepage);
  }

}
