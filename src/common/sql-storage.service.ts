import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import {  } from 'ionic-native';



@Injectable()
export class SqlStorage {
     db: SQLite;

    constructor() {       
        
        
     }

    getAll(){
             return this.accessDatabase(4,'','');
    }

    get(key: string){        
        return this.accessDatabase(2,key,'').then((val)=>{
            return val;
        });
        
    }

    remove(key: string){
        //return this.db.executeSql('delete from kv where key = ?', [key]);
        return this.accessDatabase(3,key,'').then(
            (val)=> {
                return val;
            }
        );
       
    }

    add(key: string, value: string){                 
         return this.accessDatabase(1,key,value);
    }

     update(key: string, value: string){         
         return this.accessDatabase(7,key,value);
    }

    getAllCount(){
             return this.accessDatabase(5,'','');
    }

    getCurrentObject(){
        console.log('in get current object');
        return this.accessDatabase(6,'','');       

    }
    
    /**
     * Should be called after deviceready event is fired
     */
    initializeDatabase(){
        this.db = new SQLite();
        return this.db.openDatabase({ name: 'data.db', location: 'default' }).then((db) => {            
            return this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text, currentCounter INTEGER)', []).then(data => {
                    console.log('**after CREATE TABLE check', data);  
                    //this.db.close();             
                });              
                
            });
    }

    accessDatabase(mode : number, key: string, value: string){
        try
        {
        debugger;
        this.db = new SQLite();
        return this.db.openDatabase({ name: 'data.db', location: 'default' }).then((db) => {
            debugger;
            if(mode==1)//add
            {       
                 return this.db.executeSql('update kv SET currentCounter = 0', null).then(data => {
                     console.log('in add');
                            //if (data.rows.length > 0) 
                           // {
                               return this.db.executeSql('insert or replace into kv(key, value, currentCounter) values (?, ?, 1)', [key, value]).then(data => {
                                        if (data.rows.length > 0) {
                                            this.db.close();
                                        // return JSON.parse(data.rows.item(0).value);
                                        return data.rows.length;
                                        }
                                        this.db.close();
                                    
                                });
                            //}
                            // this.db.close();
                           
                    });         
                
            }
            else if (mode ==2 )//get
            {
                return this.db.executeSql('update kv SET currentCounter = 0', null).then(data=> {
                    debugger;
                   // if(data.rows.length > 0)
                    //{
                        return this.db.executeSql('update kv SET currentCounter = 1 where key = ?', [key]).then(data => {
                            if(data.rows.length > 0)
                            {       
                                return this.db.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
                                                
                                            if (data.rows.length > 0) {
                                                this.db.close();
                                                return JSON.parse(data.rows.item(0).value);
                                            }                                            
                                    });
                            }
                        });
                    //}
                   // this.db.close();
                },(err)=>
                { 
                    debugger;
                    console.log(err);

                }).catch((err)=> {
                    debugger;
                    console.log(err);
                });                  
            }
            else if(mode==3)//remove
            {
                    return this.db.executeSql('delete from kv where key = ?', [key]).then(data => {
                    if (data.rows.length > 0) {
                        this.db.close();
                        return data.rows.length;
                    }
                    this.db.close();
             });
            }
            else if(mode==4)
            {//4 getall                
                    return this.db.executeSql('select key, value, currentCounter from kv',null).then(data => {                       
                     debugger;    
                    let results = [];
                    for (let i = 0; i < data.rows.length; i++) {
                        try
                        {
                            if(data.rows.item(i).value!='')
                                results.push(JSON.parse(data.rows.item(i).value));
                    
                        }
                        catch(err)
                        {
                            console.log(err);
                        }

                    }                    
                     this.db.close();
                     return results;
                    
                },(err)=>{
                     
                    console.log(err);

                }).catch((err)=> {
                    
                    console.log(err);
                });
            }
            else if(mode==5)//getall count
            {
                    return this.db.executeSql('select count(key) from kv ', null).then(data => {
                    if (data.rows.length > 0) {
                        this.db.close();
                        return data.rows.length;
                    }
                    this.db.close();                    
             });
            }  
            else if(mode==6)//getCurrent objeet
            {
                    return this.db.executeSql('select key, value, currentCounter from kv where currentCounter = 1 ', null).then(data => {
                        debugger;
                    if (data.rows.length > 0) {
                        this.db.close();
                        return JSON.parse(data.rows.item(0).value);
                    }
                    this.db.close();
                    return  { CounterTitle :'First Counter', CounterValue: 0, CounterIncrement :1 , CounterDecrement : 1 }
             });
            }  
             else if(mode==7)//update objeet
            {
                    return this.db.executeSql('update kv SET value = ? where key= ?  ', [value,key]).then(data => {
                    if (data.rows.length > 0) {
                        this.db.close();
                        return data.rows.length;
                    }
                    this.db.close();
             });
            }
                        
    },                      
        (err)=>{
            debugger;
          console.log(err);

        }).catch((err)=> {
            debugger;
         console.log(err);
        });
    }
   // }
    catch(ex)
    {
        debugger;
        console.log(ex);
    }
}
}