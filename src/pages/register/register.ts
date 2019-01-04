import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {AnimalProvider} from "../../providers/animals/animals";
import {HomePage} from "../home/home";
import {LoginPage} from "../login/login";
import {File} from "@ionic-native/file";
import {Transfer, TransferObject} from "@ionic-native/transfer";
import { Camera } from '@ionic-native/camera';
import {HttpClient} from "@angular/common/http";

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private loginpage = LoginPage;
  private animals;

  // private fileTransfer: FileTransferObject = this.transfer.create();

  //input values
  name: string;
  password: string;
  repeatPassword: string;
  age: any;
  gender: string;
  lookingfor: any = [];

  nameTaken = false;
  passNotMatched = false;
  img1: any;
  imgData: any;
  type: string;
  imgName: string;

  constructor(public navCtrl: NavController,
              public aniProv: AnimalProvider,
              public transfer: Transfer,
              public file: File,
              public camera: Camera,
              public http: HttpClient) {
  }

  ionViewDidEnter() {
    this.aniProv.createPouchDB();

    this.aniProv.read()
      .then(animals => {
        this.animals = animals;
        console.log(animals);
      }).catch((err) => {
      console.log(err)
    });
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      this.imgName = event.target.files[0].name;

      reader.onload = (event: any) => {
        this.img1 = event.target.result;

        let data = this.img1.split(",");
        this.imgData = data[1];
        data[0] = data[0].split(':')[1];
        this.type = data[0].split(';')[0];
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  register() {
    this.passNotMatched = false;
    this.nameTaken = false;
    for (let animal of this.animals) {
      if (animal.doc.name == this.name) {
        console.log("if entered");
        this.nameTaken = true;
      }
    }

    if (!this.nameTaken) {
      if (this.password != this.repeatPassword) {
        this.passNotMatched = true;
      } else {
        console.log(this.lookingfor);
        let newAnimal =
          {
            "name": this.name,
            "password": this.password,
            "age": this.age,
            "gender": this.gender,
            "lookingfor": this.lookingfor,
            "description": "",
            "_attachments": {
              "image" : {
                "content_type": this.type,
                "data": this.imgData
              }
            }
          };
        this.aniProv.create(newAnimal);
        this.navCtrl.setRoot(this.loginpage);
      }
    }
  }
}
