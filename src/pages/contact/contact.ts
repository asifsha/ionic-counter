import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//import { SqlStorage } from '../../common/shared';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

counterTitle :string;
incrementValue : number;
decrementValue : number;
  constructor(public navCtrl: NavController) {

  }
  SaveSettings(save)
  {
    if(save==0)
    {

    }
  }

}
