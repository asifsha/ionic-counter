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
        // return this.db.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
        //     if (data.rows.length > 0) {
        //         return JSON.parse(data.rows.item(0).value);
        //     }
        // });
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

    set(key: string, value: string){
         console.log('this.db object', key, value);
        //  this.Platform.ready().then(()=>{
        //             this.db = new SQLite();
        //         console.log('this.db object', this.db);

        //         return this.db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(data => {
        //                 if (data.rows.length > 0) {
        //                     return JSON.parse(data.rows.item(0).value);
        //                 }
        //         });
        //  });
         return this.accessDatabase(1,key,value);
    }
    
    /**
     * Should be called after deviceready event is fired
     */
    initializeDatabase(){
        this.db = new SQLite();
        return this.db.openDatabase({ name: 'data.db', location: 'default' }).then((db) => {
            return this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', []).then(data => {
                console.log('**after CREATE TABLE check', data);  
                this.db.close();             
            });
        });
    }

    accessDatabase(mode : number, key: string, value: string){
        this.db = new SQLite();
        return this.db.openDatabase({ name: 'data.db', location: 'default' }).then((db) => {
            if(mode==1)//add
            {                
                return this.db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(data => {
                            if (data.rows.length > 0) {
                                 this.db.close();
                               // return JSON.parse(data.rows.item(0).value);
                               return data.rows.length;
                            }
                             this.db.close();
                           
                    });
            }
            else if (mode ==2 )//get
            {
                    return this.db.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
                        
                    if (data.rows.length > 0) {
                        this.db.close();
                        return JSON.parse(data.rows.item(0).value);
                    }
                    this.db.close();
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
            else {//4 getall                
                    return this.db.executeSql('select key, value from kv',null).then(data => {                       
                         
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
        });
    }
}