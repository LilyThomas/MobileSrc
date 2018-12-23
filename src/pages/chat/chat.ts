import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {EmployeePage} from "../employee/employee";

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
  ) {}

  goToHome(){
    this.navCtrl.setRoot(this.homepage);
  }

}
