import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {AnimalProvider} from "../../providers/animals/animals";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private animals;
  private homepage = HomePage;
  private registerpage = RegisterPage;

  //input values
  name: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public aniProv: AnimalProvider
  ) {}

  ionViewDidEnter() {
    this.aniProv.createPouchDB();

    this.aniProv.read()
      .then(animals => {
        this.animals = animals;
      }).catch((err) => { console.log(err)} );
  }

  login(){
    let id = "";
    for(let animal of this.animals){
      if(animal.doc.name == this.name && animal.doc.password == this.password){
        id = animal.doc._id;
        this.goToHomepage(id);
      }
    }
  }

  goToHomepage(id){
    return this.navCtrl.setRoot(this.homepage, {id: id});
  }

  register(){
    return this.navCtrl.setRoot(this.registerpage);
  }

}
