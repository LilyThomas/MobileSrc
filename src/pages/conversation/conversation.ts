import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {EmployeePage} from "../employee/employee";
import {ChatPage} from "../chat/chat";

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html'
})
export class ConversationPage {

  chatpage=ChatPage;

  constructor(
    public navCtrl: NavController,
  ) {}

  returnToChat(){
    this.navCtrl.setRoot(this.chatpage);
  }
}
