import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {SettingsPage} from "../settings/settings";
import {EditinfoPage} from "../editinfo/editinfo";
import {ProfilePage} from "../profile/profile";
import {normalizeURL} from "ionic-angular";
import {AnimalProvider} from "../../providers/animals/animals";

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  id: any;
  animal:any;

  homepage=HomePage;
  settingspage=SettingsPage;
  editinfopage=EditinfoPage;
  profilepage=ProfilePage;

  imagePath = "assets/imgs/profile.jpg";

  tempImagePath = normalizeURL(this.imagePath);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aniProv: AnimalProvider
  ) {
    this.aniProv.createPouchDB();
    this.id = this.navParams.get('id');

    this.aniProv.findAnimalById(this.id).then((result) => {
      this.animal = result.docs[0];
      console.log(this.animal);
    });
  }

  getNameAndAge(){
    if(typeof this.animal != "undefined") {
      return this.animal.name + ", [" + this.animal.age + "]";
    }
  }

  getPicture(){
    if(typeof this.id != "undefined" && typeof this.animal != "undefined") {
      return this.aniProv.remote + "/" + this.id + "/" + Object.keys(this.animal._attachments)[0];
    }
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
