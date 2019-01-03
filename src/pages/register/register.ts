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
  img1:any;
  imgData:any;
  type:string;

  constructor(
    public navCtrl: NavController,
    public aniProv: AnimalProvider,
    public transfer: Transfer,
    public file: File,
    public camera: Camera,
    public http: HttpClient
  ) {}

  ionViewDidEnter() {
    this.aniProv.createPouchDB();

    this.aniProv.read()
      .then(animals => {
        this.animals = animals;
        console.log(animals);
      }).catch((err) => { console.log(err)} );
  }

  onFileSelected(event){
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.img1 = event.target.result;
        console.log("onload");
        let data = this.img1.split(",");
        this.imgData = data[1];
        console.log(this.imgData);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    // let fileList: FileList = event.target.files;
    // let file: File = fileList[0];
    // console.log(file);
    //
    // console.log("this.img1");
    // console.log(this.img1);


  }


  register(){
    console.log("register entered");
    this.passNotMatched = false;
    this.nameTaken = false;
    for(let animal of this.animals){
      if(animal.doc.name == this.name){
        console.log("if entered");
        this.nameTaken = true;
      }
    }
    if(!this.nameTaken){
      if(this.password != this.repeatPassword){
        this.passNotMatched = true;
      } else{
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
              "image": {
                "content_type": "image/jpeg",
                "data": this.imgData
              }
            }
          };
        this.aniProv.create(newAnimal);
        this.uploadImage();
        this.navCtrl.setRoot(this.loginpage);
      }
    }
  }

  uploadImage(){

    // console.log("upload image");
    // this.selectedFile = "/Users/lily/Pictures/sunyu-382788-unsplash.jpg";
    // console.log(this.selectedFile);
    // let reader = new FileReader();
    // let test = reader.readAsBinaryString(this.selectedFile, this.selectedFile);
    // console.log(test);
    // let id;
    // for(let animal of this.animals){
    //   if(animal.name == name){
    //     id = animal.name._id;
    //   }
    // }
    // if(this.selectedFile) {
    //   console.log(id);
    //   const fd = new FormData();
    //   fd.append('image', this.selectedFile, this.selectedFile.name);
    //   this.http.post(this.aniProv.remote + "/" + id + "/", fd)
    //     .subscribe(res => {
    //       console.log(res)
    //     });
    // } else{
    //   console.log(this.selectedFile);
    // }
    //
    // let options: FileUploadOptions = {
    //   fileKey: 'file',
    //   fileName: this.selectedFile.name,
    //   mimeType: this.selectedFile.type,
    //   headers: {}
    // }
    //
    // console.log("Transfer");
    // console.log(this.selectedFile);
    // console.log(this.aniProv.remote + "/" + id + "/");
    // console.log(options);
    //
    // this.fileTransfer.upload(this.selectedFile, this.aniProv.remote + "/" + id + "/", options);
    //   .then((data) => {
    //     // success
    //   }, (err) => {
    //     // error
    //   });
  }

}
