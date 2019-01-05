import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {EmployeePage} from "../employee/employee";
import {ChatPage} from "../chat/chat";
import {OverviewPage} from "../overview/overview";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  overviewpage=OverviewPage;

  constructor(
    public navCtrl: NavController,
  ) {}

  returnToOverview(){
    this.navCtrl.setRoot(this.overviewpage);
  }
}
