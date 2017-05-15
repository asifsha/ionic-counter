import { Component } from '@angular/core';

import { NavController,AlertController,ToastController } from 'ionic-angular';
import { SqlStorage } from '../../common/shared';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

public allCounters;
dataStore: SqlStorage;
private newTitle : '';


  constructor(public navCtrl: NavController, public alertCtrl :AlertController, public toastCtrl :ToastController  ) 
  {   
    this.dataStore= new SqlStorage();
    this.allCounters= [
        { CounterTitle: 'jasper', city: 'Amsterdam', CounterValue: 10 },
        { CounterTitle:'Dave',city:'phoenix', CounterValue: 22} ,
        { CounterTitle:'Gina', city:'Amsterdam', CounterValue: 9 },
        { CounterTitle: 'Philip', city:'Otterloo', CounterValue: 55}
        ];
   this.GetAll().then((val)=> { this.allCounters= val;} );
    // let t=this.GetAll().then((val)=> 
    // {
    //   debugger;
    //    return val;
       
    //   } );
    // debugger;
  }

   ionViewDidEnter() {
     this.GetAll().then((val)=> { this.allCounters= val;} );
  }

    GetAll()
    {
      console.log('in getall about');
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
      
      
      var counter= { CounterTitle : this.newTitle, CounterValue: 0, CounterIncrement :1 , CounterDecrement : 1 };
      this.dataStore.add(this.newTitle,JSON.stringify(counter)).then((val)=>
        {
        this.GetAll().then((val)=> {
          this.newTitle=''; 
          this.allCounters= val;
          this.presentToast();
          this.navCtrl.parent.select(0);
           
        } );
      }

      );

    }

     presentToast() {
            let toast = this.toastCtrl.create({
              message: 'Counter added successfully.',
              duration: 3000
            });
            toast.present();
          }

    SelectCounter(title){
      this.dataStore.get(title).then((val)=> {
        console.log(val);
         this.navCtrl.parent.select(0);
      });
    }

    DeleteCounter(title)
    {
      this.presentToast();
    }

}
    


