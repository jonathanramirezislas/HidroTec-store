import { Component } from '@angular/core';
import {Router} from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

constructor(public toastController: ToastController,public router:Router,private http:HttpClient){}

itemId:any;
itemsproductos:any;

banners: any[]=[
{id:'',
  ImagePath:'/assets/ban1.png'

},
{id:'',
  ImagePath:'/assets/ban2.jpg'

},{id:'',
  ImagePath:'/assets/ban3.jpg'

}

];


search(){
  var palabra  =  (<HTMLInputElement>document.getElementById("searchbar")).value;
if(palabra.length > 0){
  this.router.navigate([/busqueda/ + '/'+palabra]);
}else{
this.presentToast('Ingrese su palabra de busqueda');
}

}

async presentToast(msg) {
   const toast = await this.toastController.create({
     message: msg,
     duration: 2000
   });
   toast.present();
 }



compras(){
       this.router.navigateByUrl('/compras');

}


        detalle(id:any){
    console.log(id,'parametro a enviar');

     this.itemId =id;
     console.log(id,'parametro a enviar');
    this.router.navigate([/detalle/ + '/'+id]);

  }



      ionViewWillEnter(){
      this.loaddata();
    }

  async loaddata(){
    this.http.get('http://proyectosita.com/HIDROTEC/IonicProyecto/Home.php')
    .subscribe(data=>{
      this.itemsproductos=data;
      console.log(data);
    },
    error=>{
    console.log(error);
  });

  }


}
