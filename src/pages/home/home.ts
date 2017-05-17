import { Component } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { SQLite} from 'ionic-native';
import { SqlStorage } from '../../common/shared';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dataStore: SqlStorage;

  constructor(public navCtrl: NavController,
              public alertCtrl : AlertController
    //public dataStore : SqlStorage

  ) {
    this.dataStore = new SqlStorage();
    //this.GetCounterObject();   

  }




  counterObject = this.GetDefaultCounter();
  //   return obj;; //=this.GetCounterObject('');

  ionViewDidEnter() {
    this.GetCounterObject();
  }

  GetDefaultCounter() {

    var title = "First counter";
    var obj = { CounterTitle: title, CounterValue: 0, CounterIncrement: 1, CounterDecrement: 1 };
    return obj;
  }

  GetCounterObject() {
    //  if(title=='' || title == null)
    //  title="first counter";
    //   var obj= { CounterTitle :title, CounterValue: 0, CounterIncrement :1 , CounterDecrement : 1 };   
    //   return obj;
    //this.dataStore= new SqlStorage();
    console.log('in ionViewDidEnter');
    this.dataStore.getCurrentObject().then((val) => {
      debugger;
      if (val != null)
        this.counterObject = val;
      console.log(val);
    });
  }

  UpdateCounter(value: number) {
    debugger;
    var n= +this.counterObject.CounterValue;
    var v= +value;
    this.SetCounterValue(n + v);

  }

  ResetCounter() {
      let confirm = this.alertCtrl.create({
      title: 'Reset Counter',
      message: 'Do you want to reset this counter to 0?',
      buttons: [
        {
          text: 'No',
          handler: () => {
             
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.SetCounterValue(0);
          }
        }
      ]
      });
      confirm.present();    
    
  }

  SetCounterValue(val: number) {
    debugger;
    this.counterObject.CounterValue = val;
    this.SaveValue(this.counterObject);
  }

  SaveValue(obj) {

    this.dataStore.update(obj.CounterTitle, JSON.stringify(obj)).then(() => {
      console.log('value updated successfully');
      
    });




  }

}



