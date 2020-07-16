import { Component, OnInit } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  id_item:any;
comentarios:any;
promedio:any;
constructor(private http:HttpClient,public activeRoute: ActivatedRoute){
}

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.id_item=this.activeRoute.snapshot.paramMap.get('id');

  this.loaddata(this.id_item);
}

loaddata(id:any){

      var senData= JSON.stringify({id:id});
console.log('datos a search',senData);

this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/comentarios.php',senData)
.subscribe(data=>{
    console.log(data,'data');
    this.comentarios=data;
    console.log(this.comentarios,'comentarios');
  },
  error=>{
  console.log(error);
});
}

check5(promedio:any){

//5 estrellas
if(this.promedio==5){
  console.log('correcto')
return true;
}else {
return false;
}
}


}
