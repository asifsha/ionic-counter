import { Component } from '@angular/core';

import { NavController,ToastController } from 'ionic-angular';

import { SqlStorage } from '../../common/shared';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  
   dataStore: SqlStorage;

  constructor(public navCtrl: NavController,public toastCtrl :ToastController ) {
     this.dataStore = new SqlStorage();
  }
  counterObject = this.GetDefaultCounter();
  oldTitle: any;
 
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
    
    this.dataStore.getCurrentObject().then((val) => {
      debugger;
      if (val != null)
        {
          this.counterObject = val;   
          this.oldTitle=this.counterObject.CounterTitle;       
        }
      console.log(val);
    });
  }

  SaveSettings()
  {
    
    this.dataStore.updateSettings(this.oldTitle,this.counterObject.CounterTitle, JSON.stringify(this.counterObject)).then(() => {
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

  Cancel()
  {    
    this.NavigateToLastTab();
  }

  NavigateToLastTab()
  {
    let tabIndex=this.navCtrl.parent._selectHistory[this.navCtrl.parent._selectHistory.length - 2] == "t0-0" ? 0 : 1;
    this.navCtrl.parent.select(0);
  }

}
