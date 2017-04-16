import { Component } from '@angular/core';

import { NavController,AlertController } from 'ionic-angular';
import { SqlStorage } from '../../common/shared';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

public allCounters;
dataStore: SqlStorage;
private newTitle : '';


  constructor(public navCtrl: NavController, public alertCtrl :AlertController  ) 
  {   
    this.dataStore= new SqlStorage();
    this.allCounters= [
        { name: 'jasper', city: 'Amsterdam', value: 10 },
        { name:'Dave',city:'phoenix', value: 22} ,
        { name:'Gina', city:'Amsterdam', value: 9 },
        { name: 'Philip', city:'Otterloo', value: 55}
        ];
   // this.allCounters=this.GetAll();
  }

    GetAll()
    {
      
      return this.dataStore.getAll();
      
    }

    AddNewCounter(){
      if( this.newTitle=='' || this.newTitle===undefined || this.newTitle == null )
      {       
          let alert = this.alertCtrl.create({
          title: 'Required',
          subTitle: 'Please enter a title to add a new counter.',
          buttons: ['OK']
        });
        alert.present();
        return;
      }
      console.log( this.newTitle);
      var counter= { CounterTitle : this.newTitle, CounterValue: 0, CounterIncrement :1 , CounterDecrement : 1 };
      this.dataStore.set(this.newTitle,JSON.stringify(counter));

    }

    SelectCounter(title){
      console.log(title);
    }

}
    


