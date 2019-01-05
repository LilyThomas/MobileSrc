import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import {EmployeePage} from "../employee/employee";
import {OverviewPage} from "../overview/overview";
import {ChatPage} from "../chat/chat";
import {AnimalProvider} from "../../providers/animals/animals";
import {normalizeURL} from "ionic-angular";
import {MatchProvider} from "../../providers/matches/matches";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private animals;
  private matches;

  id:any;
  index:any = 0;
  seen:any;

  overviewPage=OverviewPage;
  chatPage=ChatPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aniProv: AnimalProvider,
    public matchProv: MatchProvider
  ) {
    this.id = navParams.get('id');
  }

  ionViewDidEnter() {
    this.matchProv.createPouchDB();
    this.aniProv.createPouchDB();

    this.aniProv.read()
      .then(animals => {
        this.animals = animals;
      }).catch((err) => { console.log(err)} );

    let seenIdsPromise = this.matchProv.getSeenIds(this.id);
    let randomBatchPromise = this.aniProv.getAnimalRandomBatch(this.id, seenIdsPromise);

    randomBatchPromise.then(function(result) {
        console.log(result.docs);
      })

    // this.aniProv.getAnimalRandomBatch(this.id, this.matchProv);

  }

  // getFirstKeys(obj) {
  //   return Object.keys(obj)[0];
  // }

  getAnimalsOneByOne(){

    // if(current._id == this.id) {
    //   current = this.animals[this.getNextIndex()];
    //   console.log(this.index);
    //   console.log(current.doc.name);
    // }

    // if(typeof this.animals != "undefined"){
    //   console.log(this.animals[0]);
    //
    // }
  }

  // getNextIndex(){
  //   if(this.index == this.animals.length()){
  //     this.index = 0;
  //   } else{
  //     this.index = this.index + 1;
  //   }
  //   return this.index;
  // }

  // getImageUrl(obj) {
  //   try{
  //     return this.aniProv.remote + "/" + obj.doc._id + "/" + Object.keys(obj.doc._attachments)[0];
  //   } catch (e){
  //     return normalizeURL("assets/imgs/profile.jpg");
  //   }
  // }

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
    this.navCtrl.setRoot(this.chatPage, {id: this.id});
  }

  goToOverview(){
    this.navCtrl.setRoot(this.overviewPage, {id: this.id});
  }

  notLiked(){

  }

  liked(){
    // this.getAnimalsOneByOne();
    // console.log(this.getAnimalsOneByOne().doc.name);
  }

  goToProfile(animal){

  }
}
