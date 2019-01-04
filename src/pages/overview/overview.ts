import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
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

  id: any;

  homepage=HomePage;
  settingspage=SettingsPage;
  editinfopage=EditinfoPage;
  profilepage=ProfilePage;

  imagePath = "assets/imgs/profile.jpg";

  tempImagePath = normalizeURL(this.imagePath);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.id = this.navParams.get('id');
  }

  goToHome(){
    this.navCtrl.setRoot(this.homepage, {id: this.id});
  }

  goToProfile(){
    this.navCtrl.setRoot(this.profilepage, {id: this.id});
  }

  GoToSettings(){
    this.navCtrl.setRoot(this.settingspage, {id: this.id});
  }

  GoToEditProfile(){
    this.navCtrl.setRoot(this.editinfopage, {id: this.id});
  }


}
