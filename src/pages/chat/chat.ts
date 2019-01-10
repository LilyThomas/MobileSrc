import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Content} from 'ionic-angular';
import {HomePage} from "../home/home";
import { EmployeeProvider } from './../../providers/employee/employee';
import {MatchProvider} from "../../providers/matches/matches";
import {AnimalProvider} from "../../providers/animals/animals";
import * as firebase from 'Firebase';
import {AddroomPage} from "../addroom/addroom";
import {ConversationPage} from "../conversation/conversation";





@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  @ViewChild(Content) content: Content;


  homepage=HomePage;

  matchedAnimals:any = [];

  id:any;
  rooms = [];
  ref = firebase.database().ref('chatrooms/');



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public matchProv: MatchProvider,
    public aniProv: AnimalProvider
  ) {

    this.getMatchedAnimals();
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  addRoom() {
    this.navCtrl.push(AddroomPage);
  }


  getMatchedAnimals(){
    let findMatchesPromise = this.matchProv.findMatches(this.id);
    let getMatchedAnimalsPromise = this.aniProv.getMatchedAnimals(this.id, findMatchesPromise);

    getMatchedAnimalsPromise.then((result) => {
      if(result.docs.length > 0) {
        for (let animal of result.docs) {
          this.matchedAnimals.push(animal);
        }
      }
    });
  }

  goToHome(){
    this.navCtrl.setRoot(this.homepage, {id: this.id});
  }

  // GoToConversation() {
  //   this.navCtrl.setRoot(this.homepage);
  // }

  joinRoom(key) {
    this.navCtrl.setRoot(ConversationPage, {
      key:key,
      nickname:this.navParams.get("nickname")
    });
  }
}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
