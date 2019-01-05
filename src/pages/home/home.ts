import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import {EmployeePage} from "../employee/employee";
import {OverviewPage} from "../overview/overview";
import {ChatPage} from "../chat/chat";
import {AnimalProvider} from "../../providers/animals/animals";
import {normalizeURL} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private animals;

  overviewPage=OverviewPage;
  chatPage=ChatPage;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public aniProv: AnimalProvider
  ) {}

  ionViewDidEnter() {
      this.aniProv.createPouchDB();

      this.aniProv.read()
        .then(animals => {
          this.animals = animals;
          console.log(animals);
        }).catch((err) => { console.log(err)} );
  }

  getFirstKeys(obj) {
    return Object.keys(obj)[0];
  }

  getImageUrl(obj) {
    try{
      return this.aniProv.remote + "/" + obj.doc._id + "/" + Object.keys(obj.doc._attachments)[0];
    } catch (e){
      return normalizeURL("assets/imgs/profile.jpg");
    }

  }

  // showDetails(employee) {
  //   let modal = this.modalCtrl.create('EmployeePage', { employee: employee });
  //   modal.onDidDismiss(data => {
  //     this.reReadEmployees();
  //   });
  //   modal.present();
  // }
  //
  // addEmployee() {
  //   let modal = this.modalCtrl.create('EmployeePage', { employee: null });
  //   modal.onDidDismiss(data => {
  //     this.reReadEmployees()
  //   });
  //   modal.present();
  // }
  //
  // reReadEmployees() {
  //  this.empProv.read()
  //    .then(employees => {
  //      this.employees = employees;
  //    }).catch((err) => { console.log(err)} );
  // }

  goToChat(){
    this.navCtrl.setRoot(this.chatPage);
  }

  goToOverview(){
    this.navCtrl.setRoot(this.overviewPage);
  }

  notLiked(){

  }

  liked(){

  }

  goToProfile(animal){

  }
}
