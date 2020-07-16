import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verproductocategoria',
  templateUrl: './verproductocategoria.page.html',
  styleUrls: ['./verproductocategoria.page.scss'],
})
export class VerproductocategoriaPage implements OnInit {

  constructor(public toastController: ToastController,private http:HttpClient,public router:Router,public activeRoute: ActivatedRoute) { }
items:any;
categoria:any;
  ngOnInit() {
  }

  ionViewDidEnter() {
    this.categoria=this.activeRoute.snapshot.paramMap.get('id');
    console.log('params recibidos :',this.categoria);
  this.loaddata(this.categoria);

  }



    loaddata(categoria:any){

          var senData= JSON.stringify({categoria:categoria});

    console.log('datos a search',senData);

    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/verproductosporcategoria.php',senData)
    .subscribe(data=>{
        console.log(data,'data');

  this.items=data;
          this.presentToast('Listo');

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


  async presentToast(msg) {
     const toast = await this.toastController.create({
       message: msg,
       duration: 2000
     });
     toast.present();
   }

}
