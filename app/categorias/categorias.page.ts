import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor(public toastController: ToastController,public router:Router,private http:HttpClient){}
itemsproductos:any;
  ngOnInit() {
  }


  ionViewWillEnter(){
  this.loaddata();
}

async loaddata(){
this.http.get('http://proyectosita.com/HIDROTEC/IonicProyecto/Categoria.php')
.subscribe(data=>{
  this.itemsproductos=data;
  console.log(data);
},
error=>{
console.log(error);
});

}

verproductosporcategoria(id:any){
console.log(id,'parametro a enviar');
this.router.navigate([/verproductocategoria/ + '/'+id]);

}
gohome(){
       this.router.navigateByUrl('/inicio');
}

}
