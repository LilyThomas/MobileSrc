import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {EmployeePage} from "../employee/employee";
import {OverviewPage} from "../overview/overview";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  overviewpage=OverviewPage;

  constructor(
    public navCtrl: NavController,
  ) {}

  saveSettings(){
    this.navCtrl.setRoot(this.overviewpage);
  }
}
