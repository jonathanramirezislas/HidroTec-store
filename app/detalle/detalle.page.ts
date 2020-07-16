import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { IonicRatingModule } from 'ionic4-rating';
import {ModalController} from '@ionic/angular';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  db:SQLiteObject=null;
   idusuario:any;
   result:any[]=[];
idcliente:any=0;
Calificaciondeproducto:any;
  id_item :string;
  items:any;
    comentarios:any;
  imagenesitem:any;
itemsrelacionados:any;
  cantidads:any;

  id_producto:any;


  constructor(public sqlite: SQLite,public toastController: ToastController,private http:HttpClient,public router:Router,public activeRoute: ActivatedRoute,
    public ionicRatingModule: IonicRatingModule,public modalController:ModalController) { }

  ngOnInit() {
this.id_item=this.activeRoute.snapshot.paramMap.get('id');
this.loadcalificacion(this.id_item);
  }


ionViewDidEnter() {
document.getElementById("vercomentarios").style.display = "none";
  this.id_item=this.activeRoute.snapshot.paramMap.get('id');
  this.loadcalificacion(this.id_item);
  this.loadcalificacion(this.id_item);
  console.log('params recibidos :',this.id_item);
  this.imagenes_item(this.id_item);
this.loadcomentarios(this.id_item);
this.loadproductosrelacionados(this.id_item);
this.cliente(this.id_item);//se manda id producto para realizar vsita con usuario logiado



//this.loaddata(this.id_item);//se utliza en cliente para marcar como visita de producto



}


loaddata(id:any,id_cliente:any){

      var senData= JSON.stringify({id:id,cliente_id:id_cliente});

console.log('datos a item',senData);

this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/item.php',senData)
.subscribe(data=>{
    console.log(data,'data');
    this.items=data;
    console.log(this.items,'items');
  },
  error=>{
  console.log(error);
});
}


cliente(idproducto:any){
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
        this.idcliente=this.result[0]['idusuario'];
        this.loaddata(idproducto,this.result[0]['idusuario']);
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




loadcomentarios(id:any){

      var senData= JSON.stringify({id:id});

console.log('datos a producto(item)',senData);

this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/comentarios.php',senData)
.subscribe(data=>{
  this.comentarios=data;
  if(this.comentarios.length>3){
    document.getElementById("vercomentarios").style.display = "block";
console.log('es mayor');
  }

console.log(this.comentarios,'comentarios');
  },
  error=>{
  console.log(error);
});
}


loadproductosrelacionados(id:any){

      var senData= JSON.stringify({id:id});

console.log('datos a search',senData);

this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/productosrelacionados.php',senData)
.subscribe(data=>{
  this.itemsrelacionados=data;

console.log(this.itemsrelacionados,'productos relacionados');
  },
  error=>{
  console.log(error);
});
}


loadcalificacion(id:any){

      var senData= JSON.stringify({id:id});

console.log('datos a calificacion',senData);

this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/Calificaciondeproducto.php',senData)
.subscribe(data=>{

  this.Calificaciondeproducto=data['calificacion'];
console.log('calificacion...............',this.Calificaciondeproducto);
if(  this.Calificaciondeproducto==0){
  document.getElementById('stars').innerHTML="<ion-item><h2 style=font-family:Times>Sin calificacion</h2></ion-item>";

}
if(  this.Calificaciondeproducto>0 &&   this.Calificaciondeproducto<=1){
  document.getElementById('stars').innerHTML=" <ion-item ><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon></ion-item>";

}
 if(  this.Calificaciondeproducto>1 &&   this.Calificaciondeproducto<=2){
   document.getElementById('stars').innerHTML=" <ion-item ><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon></ion-item>";
}
 if(  this.Calificaciondeproducto>2 &&   this.Calificaciondeproducto<=3){
   document.getElementById('stars').innerHTML=" <ion-item ><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon></ion-item>";

}
 if(  this.Calificaciondeproducto>3 &&   this.Calificaciondeproducto<=4){
   document.getElementById('stars').innerHTML=" <ion-item ><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/staroutline.svg></ion-icon></ion-item>";


}
if(  this.Calificaciondeproducto>4 &&   this.Calificaciondeproducto<=5){
  document.getElementById('stars').innerHTML="<ion-item><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon><ion-icon src=/assets/star.svg></ion-icon></ion-item>";


}


  },
  error=>{
  console.log(error);
});
}


detalle(id:any){
console.log(id,'parametro a enviar');

this.itemId =id;
console.log(id,'parametro a enviar');
this.router.navigate([/detalle/ + '/'+id]);

}

imagenes_item(id:any){

      var senData= JSON.stringify({id:id});

console.log('datos a search',senData);

this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/ImagenItem.php',senData)
.subscribe(data=>{
    console.log(data,'data');
    this.imagenesitem=data;
    console.log(this.imagenesitem,'items');
  },
  error=>{
  console.log(error);
});
}













itemId:any;
public cantidad:number;



         carrito(id:any,cantidad:number){
    console.log(id,'parametro a enviar');

     this.itemId =id;
     console.log('parametro id',this.itemId);
 console.log('parametro cantidad',this.cantidad);

    this.router.navigate([/compras/ + '/'+id+'/'+this.cantidad]);

  }



verimagen(){
    this.router.navigateByUrl('/image-modal');
}

  gocomentarios(){

this.router.navigate([/comentarios/ + '/'+this.id_item]);

}

sliderOpts={
zoom:false,
slidesPerView:1.5,
centeredSlides:true,
spaceBetween:20

}




Agregaralcarrito(){

var id_cliente=this.idcliente;
var cantidad:number;
   cantidad  = parseFloat((<HTMLInputElement>document.getElementById("cantidad")).value);
console.log(cantidad);
if(cantidad){

  if(cantidad>0 && cantidad<6){
    var senData= JSON.stringify({id_cliente:id_cliente,cantidad:cantidad,id_producto:this.id_item});
  console.log(senData);
    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/comprobaciondestock_y_agregaracarrito.php',senData)
    .subscribe(data => {
      this.presentToast(data);
    },
    error => {
      console.log(error);

    });
  }else{
    this.presentToast('Ingrese valor entre 1 y 5');
  }

}else{

  this.presentToast('Ingrese un valor correcto');
}


}



Agregaralwishlist(){

  var idclientes=this.idcliente;

  var senData= JSON.stringify({id_cliente:idclientes,id_producto:this.id_item});
console.log(senData);
  this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/agregarwishlist.php',senData)
  .subscribe(data => {


    this.presentToast(data);
  },
  error => {
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
