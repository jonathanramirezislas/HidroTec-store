import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
var idclientelogiado: string;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

items:any;
palabra:any;
public id:any;
result:any[]=[];

  constructor(public sqlite: SQLite,public toastController: ToastController,private http:HttpClient,public router:Router,public activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }





  ionViewDidEnter() {
    this.palabra=this.activeRoute.snapshot.paramMap.get('palabra');
    console.log('params recibidos :',this.palabra);
    this.cliente();


  }


  search(){
    var palabra  =  (<HTMLInputElement>document.getElementById("searchbar")).value;
  //this.loaddata(palabra);

  }

  async presentToast(msg) {
     const toast = await this.toastController.create({
       message: msg,
       duration: 4000
     });
     toast.present();
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
          console.log('usuario logiado en busqueda',this.result[0]['idusuario']);
          this.loaddata(this.palabra,this.result[0]['idusuario']);
        }else{
         console.log('no logedo');
         //this.goiniciarsession();

        }
      console.log(this.result);
      })
      .catch(e =>console.log(e));
    })
    .catch(e => console.log(e));
  }





  loaddata(palabra:any,idc:any){

console.log("cliente id-->",idc);
        var senData= JSON.stringify({palabra:palabra,cliente_id:idc});

  console.log('datos a search',senData);

  this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/busqueda.php',senData)
  .subscribe(data=>{
      console.log(data,'data');

this.items=data;
      if(this.items.length>0){
        this.presentToast('Listo');
      }else{
        this.presentToast('No se encontro articulos relacionados');
        this.gohome();
      }
    },
    error=>{
    console.log(error);
  });

  console.log(this.items,'data');
  }

  detalle(id:any){
console.log(id,'parametro a enviar');

this.router.navigate([/detalle/ + '/'+id]);

}


gohome(){
  this.router.navigate(['/inicio']);//home

  }


}
