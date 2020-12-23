import { Component, OnInit } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  db:SQLiteObject=null;
   idusuario:any;
   result:any[]=[];
  constructor(public sqlite: SQLite,public router:Router,private http:HttpClient) { }

  ngOnInit() {
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

    itemsproductos:any;

      ionViewWillEnter(){
       this.cliente(); 
    //this.loaddata(20); //prueba
    }


    loaddata(id:any){

          var senData= JSON.stringify({id:id});

    console.log('datos a search',senData);

    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/historial.php',senData)
    .subscribe(data=>{
        console.log(data,'data');

  this.itemsproductos=data;


      },
      error=>{
      console.log(error);
    });

    console.log(this.itemsproductos,'data');
    }

    gohome(){

  this.router.navigate(['/inicio']);

    }

    goiniciarsession(){

  this.router.navigate(['/iniciarsession']);

    }


    agregarcomentario(id:any){

  this.router.navigate([/addcomentario/ + '/'+id]);

    }

}
