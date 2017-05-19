import { Component } from '@angular/core';

import { NavController, AlertController, ToastController } from 'ionic-angular';
import { SqlStorage } from '../../common/shared';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public allCounters;
  dataStore: SqlStorage;
  private newTitle: '';


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.dataStore = new SqlStorage();   
    this.GetAll().then((val) => { this.allCounters = val; });    
  }

  ionViewDidEnter() {
    this.GetAll().then((val) => { this.allCounters = val; });
  }

  GetAll() {
    
    return this.dataStore.getAll();

  }

  AddNewCounter() {
    if (this.newTitle == '' || this.newTitle === undefined || this.newTitle == null) {
      let alert = this.alertCtrl.create({
        title: 'Required',
        subTitle: 'Please enter a title to add a new counter.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    this.dataStore.isExists(this.newTitle).then((val) => {
      debugger;
      if (val == null || val===undefined) {
        var counter = { CounterTitle: this.newTitle, CounterValue: 0, CounterIncrement: 1, CounterDecrement: 1 };
        this.dataStore.add(this.newTitle, JSON.stringify(counter)).then((val) => {
          this.GetAll().then((val) => {
            this.newTitle = '';
            this.allCounters = val;
            this.presentToast();
            this.navCtrl.parent.select(0);
          });
        });
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'A counter with this title already exists, Please use a different title to add a new counter.',
          buttons: ['OK']
        });
        alert.present();
        return;   
      }
    });


  }

  presentToast(message = "Counter added successfully.") {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  SelectCounter(event, title) {
    event.stopPropagation();
    this.dataStore.get(title).then((val) => {
      console.log(val);
      this.navCtrl.parent.select(0);
    });
  }

  DeleteCounter(event, title) {
    event.stopPropagation();
    let confirm = this.alertCtrl.create({
      title: 'Delete Counter',
      message: 'Do you want to delete this counter ' + title + '?',
      buttons: [
        {
          text: 'No',
          handler: () => {


          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.dataStore.remove(title).then((val) => {
              this.navCtrl.parent.select(0);
              this.presentToast('Counter removed successfully.');
            });
          }
        }
      ]
    });
    confirm.present();


  }

}



