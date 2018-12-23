import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {HomePage} from "../home/home";
import { EmployeeProvider } from './../../providers/employee/employee';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  private employees;

  homepage=HomePage;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public empProv: EmployeeProvider
  ) {}

  goToHome(){
    this.navCtrl.setRoot(this.homepage);
  }

  GoToConversation() {
    this.navCtrl.setRoot(this.homepage);
  }
}
