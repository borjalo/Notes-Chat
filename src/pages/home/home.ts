import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {FirebaseListObservable} from "angularfire2/database";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;
  newItem='';
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public loadingCtrl: LoadingController, public firebaseService: FirebaseServiceProvider) {
    this.items=this.firebaseService.getItems();
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
