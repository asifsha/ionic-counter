import { Component } from '@angular/core';

import { NavController, ToastController, AlertController } from 'ionic-angular';

import { SqlStorage } from '../../common/shared';

@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage {


  dataStore: SqlStorage;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.dataStore = new SqlStorage();
  }
  counterObject = this.GetDefaultCounter();
  oldTitle: any;
 

  ionViewDidEnter() {
    this.GetCounterObject();
  }

  GetDefaultCounter() {

    var title = "First counter";
    var obj = { CounterTitle: title, CounterValue: 0, CounterIncrement: 1, CounterDecrement: 1 };
    return obj;
  }

  GetCounterObject() {

    this.dataStore.getCurrentObject().then((val) => {      
      if (val != null) {
        this.counterObject = val;
        this.oldTitle = this.counterObject.CounterTitle;
      }      
    });
  }

  SaveSettings() {
    var errorMessage = '';
    if (this.counterObject.CounterTitle == '' || this.counterObject.CounterTitle === undefined || this.counterObject.CounterTitle == null) {
      errorMessage += ", Please enter a title to update the counter.";
    }

    if (this.counterObject.CounterIncrement === undefined || this.counterObject.CounterIncrement == null ||
      this.counterObject.CounterIncrement > 100000 || this.counterObject.CounterIncrement < 1) {
      errorMessage += ", Please enter a value for Increment between 1 and 100000.";
    }

    if (this.counterObject.CounterDecrement === undefined || this.counterObject.CounterDecrement == null ||
      this.counterObject.CounterDecrement > 100000 || this.counterObject.CounterDecrement < 1) {
      errorMessage += ", Please enter a value for Decrement between 1 and 100000.";
    }

    if (errorMessage != '') {
      errorMessage=errorMessage.substr(2);
      let alert = this.alertCtrl.create({
        title: 'Required',
        subTitle: errorMessage,
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    this.dataStore.updateSettings(this.oldTitle, this.counterObject.CounterTitle, JSON.stringify(this.counterObject)).then(() => {
      this.presentToast();
      this.NavigateToLastTab();

    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Settings saved successfully.',
      duration: 3000
    });
    toast.present();
  }

  Cancel() {
    this.NavigateToLastTab();
  }

  NavigateToLastTab() {    
    this.navCtrl.parent.select(0);
  }

}
