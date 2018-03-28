import { Component } from '@angular/core';
import {AlertController } from 'ionic-angular';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {AngularFireDatabase } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<any[]>;
  newItem='';
  constructor(public alertCtrl: AlertController,
              public firebaseService: FirebaseServiceProvider,
              public angDb: AngularFireDatabase) {
    this.items = this.firebaseService.getItems();
  }

  add(){
    if(this.newItem==''){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Por favor, introduzca una nota.',
        buttons: ['OK']
      });
      alert.present();
    } else{
      this.firebaseService.add(this.newItem);
      this.newItem='';
    }
  }

  remove(id){
    let alert = this.alertCtrl.create({
      title: '¿Está seguro de que desea eliminar la nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        },
        {
          text: 'Eliminar',

          handler: () => {
            this.firebaseService.remove(id);
          }
        }
      ]
    });
    alert.present();

  }

}
