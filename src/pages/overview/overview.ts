import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {EmployeePage} from "../employee/employee"

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  private employees;

  homepage=HomePage;

  constructor(
    public navCtrl: NavController,
  ) {}

  goToHome(){
    this.navCtrl.setRoot(this.homepage);
  }

  goToProfile(){

  }

}
