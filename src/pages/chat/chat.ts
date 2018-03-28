import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Socket} from 'ng-socket-io';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  nickname: '';
  messages= [];
  message='';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
    this.getMessages().subscribe(message =>{
      this.messages.push(message);
    });

    /*this.getUsers().subscribe(data =>{
      let user=data['user'];
      if(user===null){
        this.showToast('Guest se ha unido.');
      } else{
        if(data['event'] ==='left'){
          this.showToast(user + ' se ha ido.');
        } else {
          this.showToast(user + ' se ha unido.');

        }
      }

    });*/

  }


  ionViewDidLoad(){

    this.socket.connect();
    console.log("connected")

  }

  /*getUsers(){
    let observable= new Observable(observer => {
      this.socket.on('users-changed', data=>{
        observer.next(data);
      })
    });
    return observable;
  }*/

  sendMessage(){
    this.socket.emit('set-nickname', this.nickname);
    this.socket.emit('add-message', {
      text:this.message
    });
    this.message='';
  }
  getMessages(){
    let observable= new Observable(observer => {
      this.socket.on('message', data=>{
        observer.next(data);
      })
    });
    return observable;
  }


  ionViewWillLeave(){
    this.socket.disconnect();
  }

  /*showToast(msg){
    let toast=this.toastCtrl.create({
      message:msg,
      duration:2000
    });
    toast.present();
  }*/

}
