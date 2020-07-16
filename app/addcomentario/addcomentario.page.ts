import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import{ HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';



@Component({
  selector: 'app-addcomentario',
  templateUrl: './addcomentario.page.html',
  styleUrls: ['./addcomentario.page.scss'],
})
export class AddcomentarioPage implements OnInit {
  db:SQLiteObject=null;
   idusuario:any;
   result:any[]=[];
id_item:any;
productos:any;

constructor(public sqlite: SQLite,public toastController: ToastController,private http:HttpClient,public activeRoute: ActivatedRoute,public router:Router){}

  ngOnInit() {
  }


  ionViewWillEnter(){
    this.id_item=this.activeRoute.snapshot.paramMap.get('id');
  this.cliente();

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
            this.loaddata(this.result[0]['idusuario'],this.id_item);
this.idusuario=this.result[0]['idusuario'];
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




  Agregarcomentario(){

    var puntuacion  =  (<HTMLInputElement>document.getElementById("calificacion")).value;
    var comentario  =  (<HTMLInputElement>document.getElementById("comentario")).value;
    var id_producto=this.id_item;
    var senData= JSON.stringify({id_producto:id_producto,id_cliente:this.idusuario,comentario:comentario,puntuacion:puntuacion});
  console.log(senData);

  if(comentario){
    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/Agregarcomentario.php',senData)
    .subscribe(data => {

this.presentToast(data);
    },
    error => {
      console.log(error);

    });

  }else{
this.presentToast('Ingrese un comentario porfavor')
  }


}

verconetnido(){
  var calificacion  = (<HTMLInputElement>document.getElementById("calificacion")).value;
  var comentario  =  (<HTMLInputElement>document.getElementById("comentario")).value;
console.log("calf",calificacion);
console.log("comentario",comentario);

}

loaddata(id:any,id_producto:any){

      var senData= JSON.stringify({id:id,id_producto:id_producto});

console.log('itemcomentario',senData);

this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/itemcomentario.php',senData)
.subscribe(data=>{
    console.log(data,'data');
    this.productos=data;
    console.log(this.productos,'items');
  },
  error=>{
  console.log(error);
});
}


async presentToast(msg) {
   const toast = await this.toastController.create({
     message: msg,
     duration: 2000
   });
   toast.present();
 }



}
