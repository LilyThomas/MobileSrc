import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {OverviewPage} from "../overview/overview";

@IonicPage()
@Component({
  selector: 'page-editinfo',
  templateUrl: 'editinfo.html'
})
export class EditinfoPage {

  overviewpage=OverviewPage;

  constructor(
    public navCtrl: NavController,
  ) {}

  saveInfo(){
    this.navCtrl.setRoot(this.overviewpage);
  }

}
