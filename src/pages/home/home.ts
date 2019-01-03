import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import {EmployeePage} from "../employee/employee";
import {OverviewPage} from "../overview/overview";
import {ChatPage} from "../chat/chat";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private employees;

  overviewPage=OverviewPage;
  chatPage=ChatPage;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public empProv: EmployeeProvider
  ) {}

  ionViewDidEnter() {
      this.empProv.createPouchDB();

      this.empProv.read()
        .then(employees => {
          this.employees = employees;
        }).catch((err) => { console.log(err)} );
  }

  showDetails(employee) {
    let modal = this.modalCtrl.create('EmployeePage', { employee: employee });
    modal.onDidDismiss(data => {
      this.reReadEmployees();
    });
    modal.present();
  }

  addEmployee() {
    let modal = this.modalCtrl.create('EmployeePage', { employee: null });
    modal.onDidDismiss(data => {
      this.reReadEmployees()
    });
    modal.present();
  }

  reReadEmployees() {
   this.empProv.read()
     .then(employees => {
       this.employees = employees;
     }).catch((err) => { console.log(err)} );
  }

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
