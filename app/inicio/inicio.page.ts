import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  constructor(public menuCtrl: MenuController,public toastController: ToastController,public router:Router,private http:HttpClient){}
  ngOnInit() {
  }
  itemId:any;
  itemsproductos:any;

  banners: any[]=[
  {id:'',
    ImagePath:'http://proyectosita.com/HIDROTEC/administracionhidrotec/imagenes/ban1.png'

  },
  {id:'',
    ImagePath:'http://proyectosita.com/HIDROTEC/administracionhidrotec/imagenes/ban2.jpg'

  },{id:'',
    ImagePath:'http://proyectosita.com/HIDROTEC/administracionhidrotec/imagenes/ban3.jpg'

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
        this.menuCtrl.enable(true);
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
