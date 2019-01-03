import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {EmployeePage} from "../employee/employee"
import {SettingsPage} from "../settings/settings";
import {EditinfoPage} from "../editinfo/editinfo";
import {ProfilePage} from "../profile/profile";
import {normalizeURL} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  private employees;

  homepage=HomePage;
  settingspage=SettingsPage;
  editinfopage=EditinfoPage;
  profilepage=ProfilePage;

  imagePath = "assets/imgs/profile.jpg";

  tempImagePath = normalizeURL(this.imagePath);

  constructor(
    public navCtrl: NavController,
  ) {}

  goToHome(){
    this.navCtrl.setRoot(this.homepage);
  }

  goToProfile(){
    this.navCtrl.setRoot(this.profilepage);
  }

  GoToSettings(){
    this.navCtrl.setRoot(this.settingspage);
  }

  GoToEditProfile(){
    this.navCtrl.setRoot(this.editinfopage);
  }


}
