import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class FirebaseServiceProvider {

  constructor(public afd: AngularFireDatabase) {
    console.log('Hello FirebaseServiceProvider Provider');
  }


  getItems(){
    return this.afd.list('items').valueChanges();
  }

  add(name){
    this.afd.list('/items/').push(name);
  }

  remove(id){
    this.afd.list('/items/').remove(id);
  }

}
