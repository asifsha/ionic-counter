import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { SQLite} from 'ionic-native';
import { SqlStorage } from '../../common/shared';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

dataStore : SqlStorage;
  
  constructor(public navCtrl: NavController
              //public dataStore : SqlStorage
             
               ) {
                this.dataStore = new SqlStorage();
    // let db = new SQLite();
    //         db.openDatabase({
    //             name: "data.db",
    //             location: "default"
    //         }).then(() => {
    //             db.executeSql("CREATE TABLE IF NOT EXISTS counters (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {}).then((data) => {
    //                 console.log("TABLE CREATED: ", data);
    //             }, (error) => {
    //                 console.error("Unable to execute sql", error);
    //             })
    //         }, (error) => {
    //             console.error("Unable to open database", error);
    //         });
    //this.fileStorage= storage;
  //   storage.ready().then( () => {
  //    storage.set('name', 'Max');

  //    storage.get('name').then((val) => {
  //        console.log('Your name is', val);
  //      })
  //  }

   //);

  }

  

    counterNextId: number  = 1;
    counterObject=this.GetCounterObject('');

   GetCounterObject (title){
   if(title=='' || title == null)
   title="first counter";
    var obj= { CounterId: this.counterNextId, CounterTitle :title, CounterValue: 0, CounterIncrement :1 , CounterDecrement : 1 };
   this.counterNextId=this.counterNextId + 1;
    return obj;
 }

 UpdateCounter (value){
   this.SetCounterValue(this.counterObject.CounterValue + value);  

 }

 ResetCounter(){
   this.SetCounterValue(0);
 }

 SetCounterValue(val)
 {
    this.counterObject.CounterValue=val;
    this.SaveValue(this.counterObject);
 }

 SaveValue(obj)
 {   
   
   let k =obj.CounterId + "";
   console.log(obj.CounterId);
   console.log(obj.CounterValue);
   this.dataStore.set(k,JSON.stringify(obj)).then(()=>{
        console.log('added successfully');
          this.dataStore.get(k).then( (val) =>{
            debugger;
            console.log(val);
          //console.log(JSON.parse(val));  
      });
   });
   
   
  //  this.database.set("1",  JSON.stringify(obj));
  //  var o=this.database.get("1");
  //  console.log(o);
   //this.database = new SQLite();
  //  this.database.openDatabase({
  //               name: "data.db",
  //               location: "default"
  //           }).then(() => {
  //   this.database.executeSql("INSERT INTO counters (firstname, lastname) VALUES ('Nic', 'Raboy')", []).then((data) => {
  //           console.log("INSERTED: " + JSON.stringify(data));
  //       }, (error) => {
  //           console.log("ERROR: " + JSON.stringify(error.err));
  //       });
  //           }, (error) => {
  //               console.log("ERROR: ", error);
  //           });
   //let o=this.fileStorage.get("1");
   //var odata=JSON.parse(o);
   //console.log('o : ', o);
   //this.fileStorage.remove("1");
   //this.fileStorage.set("1",JSON.stringify(obj));
    //this.fileStorage.ready().then( () => {

     
     //this.fileStorage.set(obj.Id, JSON.stringify(obj));
    //  this.fileStorage.set('CounterTitle', obj.CounterTitle);
    //  this.fileStorage.set('CounterValue', obj.CounterValue);
    //  this.fileStorage.set('CounterIncrement', obj.CounterIncrement);
    //  this.fileStorage.set('CounterDecrement', obj.CounterDecrement);
     

    //  this.fileStorage.get('Id').then((val) => {
    //      console.log('Id : ', val);
    //    })


    //  this.fileStorage.get('CounterTitle').then((val) => {
    //      console.log('CounterTitle : ', val);
    //    })

    //  this.fileStorage.get('CounterValue').then((val) => {
    //      console.log('CounterValue : ', val);
    //    })

  // }

   //);

 }

}


   //);

 //}

//}
