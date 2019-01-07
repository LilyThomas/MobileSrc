import { Component } from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams} from 'ionic-angular';
import {HomePage} from "../home/home";
import { EmployeeProvider } from './../../providers/employee/employee';
import {MatchProvider} from "../../providers/matches/matches";
import {AnimalProvider} from "../../providers/animals/animals";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  id:any;

  homepage=HomePage;

  matchedAnimals:any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public matchProv: MatchProvider,
    public aniProv: AnimalProvider
  ) {
    this.id = this.navParams.get('id');
    this.getMatchedAnimals();
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
}
