import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {SettingsPage} from "../settings/settings";
import {EditinfoPage} from "../editinfo/editinfo";
import {ProfilePage} from "../profile/profile";
import {normalizeURL} from "ionic-angular";

import {Camera, CameraOptions} from "@ionic-native/camera";

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
    private camera: Camera
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

  OpenCamera(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });


  }

}
