import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {

  constructor(public router:Router,public sqlite: SQLite) { }

  ngOnInit() {
  }


  saldo(){


     this.router.navigateByUrl('/billetera');

 }
 historial(){


     this.router.navigateByUrl('/historial');

 }


  ajustes(){

     this.router.navigateByUrl('/perfilajustes');

 }

 gomisdatos(){
        this.router.navigateByUrl('/misdatos');
 }

gologin(){
        this.router.navigateByUrl('/iniciarsession');
 }

Cerrarsesion(){
  this.sqlite.create({
    name: 'ntvslite.db',
    location:'default'
  })
  .then((db:SQLiteObject)=>{
    db.executeSql('delete  FROM usuarios where log=1',[])
    .then(()=>{

        this.gologin();
      console.log('se elimino de sqlite');

    })
    .catch(e =>console.log(e));
  })
  .catch(e => console.log(e));


}

}
