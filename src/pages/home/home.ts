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
  unseenAnimals: any = [];

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
    // let unseenAnimals = this.unseenAnimals;

    console.log("welcome to the homepage");
    this.matchProv.createPouchDB();
    this.aniProv.createPouchDB();
    this.getNextAnimalBatch();
    //
    // this.aniProv.read()
    //   .then(animals => {
    //     this.animals = animals;
    //   }).catch((err) => { console.log(err)} );
  }

  getNextAnimalBatch(){
    let seenIdsPromise = this.matchProv.getSeenIds(this.id);
    let randomBatchPromise = this.aniProv.getAnimalRandomBatch(this.id, seenIdsPromise);

    randomBatchPromise.then((result:any) => {
      this.unseenAnimals = this.unseenAnimals.concat(result.docs);
    })
  }

  getAnimalsOneByOneName(){
    if(this.unseenAnimals.length != 0){
      return this.unseenAnimals[0].name + ", [" + this.unseenAnimals[0].age + "]";
    }
    return "No animals found :(";
  }

  getAnimalOneByOnePicture(){
    if(this.unseenAnimals.length != 0){
      return this.getImageUrl(this.unseenAnimals[0]);
    } else{
      return normalizeURL("assets/imgs/flame.jpg");
    }
  }

  // getFirstKeys(obj) {
  //   return Object.keys(obj)[0];
  // }

  // getAnimalsOneByOne(){

    // if(current._id == this.id) {
    //   current = this.animals[this.getNextIndex()];
    //   console.log(this.index);
    //   console.log(current.doc.name);
    // }

    // if(typeof this.animals != "undefined"){
    //   console.log(this.animals[0]);
    //
    // }
  // }

  // getNextIndex(){
  //   if(this.index == this.animals.length()){
  //     this.index = 0;
  //   } else{
  //     this.index = this.index + 1;
  //   }
  //   return this.index;
  // }

  getImageUrl(obj) {
    try{
      return this.aniProv.remote + "/" + obj._id + "/" + Object.keys(obj._attachments)[0];
    } catch (e){
      return normalizeURL("assets/imgs/logo.jpg");
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
    this.navCtrl.setRoot(this.chatPage, {id: this.id});
  }

  goToOverview(){
    this.navCtrl.setRoot(this.overviewPage, {id: this.id});
  }

  notLiked(){
    if(this.unseenAnimals.length != 0){
      this.matchProv.insertAnswer(this.id, this.unseenAnimals[0]._id, false);
      this.unseenAnimals.shift();
    }
  }

  liked(){
    if(this.unseenAnimals.length != 0){
      this.matchProv.insertAnswer(this.id, this.unseenAnimals[0]._id, true);
      this.unseenAnimals.shift();
    }
  }

  goToProfile(animal){

  }
}
