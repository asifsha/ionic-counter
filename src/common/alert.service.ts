import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertService {
    
    
  constructor(public alertCtrl: AlertController) {
    
  }

  showAlert(message, title ) {
      if(title==null || title=='')
        title='';
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}