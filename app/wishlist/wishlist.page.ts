import { Component, OnInit } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  db:SQLiteObject=null;
   idusuario:any;
   result:any[]=[];
    constructor(public sqlite: SQLite,public toastController: ToastController,private http:HttpClient,public router:Router) { }

    ngOnInit() {
    }


  itemsproductos:any;

    ionViewWillEnter(){
    this.cliente(); /// descomentar 

//this.loaddata(20);
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
          this.loaddata(this.result[0]['idusuario']);

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

  this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/wishlist.php',senData)
  .subscribe(data=>{
      console.log(data,'data');

this.itemsproductos=data;


    },
    error=>{
    console.log(error);
  });

  console.log(this.itemsproductos,'data');
  }


  godetalles(id:any){
    this.router.navigate([/detalle/ + '/'+id]);
  }


  eliminar(producto:any){

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
          this.loaddata(this.result[0]['idusuario']);
/**/
var senData= JSON.stringify({id:this.result[0]['idusuario'],producto:producto});

console.log('datos a search',senData);

this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/eliminardewishlist.php',senData)
.subscribe(data=>{
console.log(data,'data');


this.presentToast(data);

this.loaddata(this.result[0]['idusuario']);

},
error=>{
console.log(error);
});
/* */


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
     gohome(){
            this.router.navigateByUrl('/inicio');
     }

}
