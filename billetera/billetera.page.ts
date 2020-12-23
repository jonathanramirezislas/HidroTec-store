import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import{ HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-billetera',
  templateUrl: './billetera.page.html',
  styleUrls: ['./billetera.page.scss'],
})
export class BilleteraPage implements OnInit {
  db:SQLiteObject=null;
   idusuario:any;
   result:any[]=[];
datoscliente:any;
Saldo:any;
Nombre:any;
  constructor(public sqlite: SQLite,public router:Router,public toastController: ToastController,private http:HttpClient) {}


  ngOnInit() {
  }


  ionViewDidEnter() {
  this.cliente(); //descoemntar
   //cliente prueba 
  //this.loaddatos(20);

  //fin de cliente prueba
  }




    cliente(){
      this.sqlite.create({
        name: 'ntvslite.db',
        location:'default'
      })
      .then((db:SQLiteObject)=>{
        db.executeSql('SELECT * FROM usuarios where log=1',[])
        .then((res)=>{
          this.result=[];

          if(res.rows.length>0){

            for(var i=0;i<res.rows.length;i++){
              this.result.push({idusuario:res.rows.item(i).idusuario});
            }
            console.log('usuario logeado',this.result[0]['idusuario']);
            this.loaddatos(this.result[0]['idusuario']);

          }else{
           console.log('no logedo');
           this.goiniciarsession();

          }
        console.log(this.result);
        })
        .catch(e =>console.log(e));
      })
      .catch(e => console.log(e));
    }
    goiniciarsession(){

  this.router.navigate(['/iniciarsession']);

    }





  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 2000
    });
    toast.present();
  }

  canjear(){

    var codigo_  =  (<HTMLInputElement>document.getElementById("codigo")).value;
    var id_cliente=this.result[0]['idusuario'];
    var senData= JSON.stringify({codigo:codigo_,id_cliente:id_cliente});
    console.log(senData);
    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/codigosaldo.php',senData)
    .subscribe(data => {
      this.presentToast(data);

      this.loaddatos(id_cliente);

    },
    error => {
      console.log(error);

    });

  }


  loaddatos(id:any){
    var senData= JSON.stringify({id_cliente:id});
    console.log(senData);
    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/Datoscliente.php',senData)
    .subscribe(data => {
      console.log(data);
this.datoscliente=data[0];
this.Saldo=this.datoscliente['Saldo'];
this.Nombre=this.datoscliente['nombre'];

console.log('datoscliente',this.datoscliente['Saldo']);
    },
    error => {
      console.log(error);

    });

  }

  gohome(){
         this.router.navigateByUrl('/inicio');
  }

}
