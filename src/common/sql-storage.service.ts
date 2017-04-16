import { Injectable } from '@angular/core';
//import { SQLite } from 'ionic-native';
import {  } from 'ionic-native';
import { Storage } from '@ionic/storage';

@Injectable()
export class SqlStorage {
    //public db: SQLite;
public db: Storage;
    constructor() {
        //this.db = new Storage();
     }

    getAll(){
        //  let results = [];
        //  this.db.forEach( (value, key, index) => {
             
        //         results.push(JSON.parse(value));
        // });
        // return results;

        // return this.db.executeSql('SELECT key, value FROM kv', []).then(data => {
        //     let results = [];
        //     for (let i = 0; i < data.rows.length; i++) {
        //         results.push(JSON.parse(data.rows.item(i).value));
        //     }
        //     return results;
        // });
    }

    get(key: string){
        // return this.db.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
        //     if (data.rows.length > 0) {
        //         return JSON.parse(data.rows.item(0).value);
        //     }
        // });
        return this.db.get(key);
    }

    remove(key: string){
       // return this.db.executeSql('delete from kv where key = ?', [key]);
       this.db.remove(key);
    }

    set(key: string, value: string){
        // return this.db.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(data => {
        //     if (data.rows.length > 0) {
        //         return JSON.parse(data.rows.item(0).value);
        //     }
        // });
        // var o=this.db.get(key);
        // console.log(o);
        // if(o!=null)
        // {
        //  this.db.remove(key);
        // }
        this.db.set(key,value);
        
    }
    
    /**
     * Should be called after deviceready event is fired
     */
    // initializeDatabase(){
    //     this.db = new SQLite();
    //     return this.db.openDatabase({ name: 'data.db', location: 'default' }).then((db) => {
    //         return this.db.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', []).then(data => {
    //             console.log('**after CREATE TABLE check', data);
    //         });
    //     });
    // }
}