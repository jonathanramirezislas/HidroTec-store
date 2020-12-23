import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  db:SQLiteObject=null;
   idusuario:any;
   result:any[]=[];

id_item :string;
cantidad:string;

   constructor(private network: Network,public androidFingerprintAuth: AndroidFingerprintAuth,public sqlite: SQLite,public loadingController: LoadingController,public toastController: ToastController,private http:HttpClient,public router:Router,public activeRoute: ActivatedRoute) { }
idcliente:any;
items:any;
datoscompra:any;
 subtotal:any;
iva:any;
envio:any;
total:any;

  ngOnInit() {
  }

ionViewDidEnter() {
 this.cliente();// descomentar

//clieente prueba
//this.loaddata(20);
 //         this.loaddatoscompra(20);
   //       this.idcliente=20;
//fin de ciente prueba


let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
let msg=('Red desconectada !');
 this.presentToast(msg);
});


let connectSubscription = this.network.onConnect().subscribe(() => {
let msg=('Red es conectada!');
 this.presentToast(msg);

setTimeout(() => {
  if (this.network.type === 'wifi') {
    let msg=('Red es Wifi');
     this.presentToast(msg);
  }
}, 3000);
});
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
        //  this.loaddata(this.result[0]['idusuario']);
          this.loaddata(this.result[0]['idusuario']);
          this.loaddatoscompra(this.result[0]['idusuario']);
          this.idcliente=this.result[0]['idusuario'];
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



    loaddata(id:any){

          var senData= JSON.stringify({id:id});

    console.log('datos a search',senData);

    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/MostrarCarrito.php',senData)
    .subscribe(data=>{
        console.log(data,'data');

        if(data[0]){
          this.items=data;
        }else{
          this.presentToast('su carrito esta vacio');
          this.gohome();
        }


      },
      error=>{
      console.log(error);
    });

    console.log(this.items,'data');
    }

    loaddatoscompra(id:any){

          var senData= JSON.stringify({id:id});
console.log(senData,'data a loadcompra');
    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/Datoscompra.php',senData)
    .subscribe(data=>{
console.log(data,'datoscompra');
  if(data['TOTAL']>0){
  this.datoscompra=data;
  this.subtotal=data['SUBTOTAL'];
  this.iva=data['IVA'];
  this.envio=data['ENVIO'];
  this.total=data['TOTAL'];
}else{
this.presentToast('Carrito vacio');
}





console.log(this.subtotal,'DATOSCOMPRA');
      },
      error=>{
      console.log(error);
    });

    console.log(this.items,'data');
    }



    eliminar(producto:any){


      var id=this.idcliente;;
          var senData= JSON.stringify({id:id,producto:producto});

    console.log('datos a search',senData);

    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/eliminarcarritodelcarrito.php',senData)
    .subscribe(data=>{
        console.log(data,'data');

    this.items=data;
          this.presentToast('Se elimino');
this.loaddata(id);
this.loaddatoscompra(id);

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



  realizarcompra(){

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
      /* */
      var senData= JSON.stringify({id_cliente:this.result[0]['idusuario']});
console.log('datos a realizar compra',senData);
this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/realizarcompra.php',senData)
.subscribe(data=>{
  this.presentToast(data);
  this.goinicio();
  },
  error=>{
  console.log(error);
});

      /*  */
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


  async presentToast(msg) {
     const toast = await this.toastController.create({
       message: msg,
       duration: 2000
     });
     toast.present();
   }


           goinicio(){

       this.router.navigate(['/inicio']);

     }



     async presentLoading() {
      const loading = await this.loadingController.create({
        message: 'Espere',
        duration: 2000
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();

      console.log('Loading dismissed!');
    }

    gohome(){
           this.router.navigateByUrl('/home');
    }


    //huella

    validarsensor(){
      this.androidFingerprintAuth.isAvailable()
      .then((result)=> {
        if(result.isAvailable){
          // it is available

          this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
            .then(result => {
               if (result.withFingerprint) {
                   console.log('Successfully encrypted credentials.');
                   console.log('Encrypted credentials: ' + result.token);
              this.realizarcompra();
               } else if (result.withBackup) {
              this.realizarcompra();
                 console.log('Successfully authenticated with backup password!');
               } else console.log('Didn\'t authenticate!');
            })
            .catch(error => {
               if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                 console.log('Fingerprint authentication cancelled');
               } else console.error(error)
            });

        } else {
          // fingerprint auth isn't available
        }
      })
      .catch(error => console.error(error));

    }



}
