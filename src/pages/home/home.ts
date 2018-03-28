import { Component } from '@angular/core';
import {AlertController } from 'ionic-angular';
import {FirebaseServiceProvider} from "../../providers/firebase-service/firebase-service";
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  newItem='';
  constructor(public alertCtrl: AlertController,
              public firebaseService: FirebaseServiceProvider,
              public angDb: AngularFireDatabase) {
    this.itemsRef = this.angDb.list("items");
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    console.log(this.items)
  }

  add(item: any){
    if(item==''){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Por favor, introduzca una nota.',
        buttons: ['OK']
      });
      alert.present();
    } else{
      this.itemsRef.push({text: item.text});
    }
  }

  remove(id){
    console.log(id);
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
            this.itemsRef.remove(id);
          }
        }
      ]
    });
    alert.present();
  }

  update(key: string) {
    let prompt = this.alertCtrl.create({
      title: 'Cambiar',
      message: "Introduce el cambio que quieres hacer",
      inputs: [
        {
          name: 'nota',
          placeholder: 'Nota'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Guardar',
          handler: data => {
            this.itemsRef.update(key, { text: data.nota })
          }
        }
      ]
    });
    prompt.present();
  }

  addNote() {
    let prompt = this.alertCtrl.create({
      title: 'Añadir',
      message: "Introduce una nota que quieras añadir",
      inputs: [
        {
          name: 'nota',
          placeholder: 'Nota'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Guardar',
          handler: data => {
            this.add({ text: data.nota})
          }
        }
      ]
    });
    prompt.present();
  }



}
