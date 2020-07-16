import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})
export class MisdatosPage implements OnInit {
db:SQLiteObject=null;
 idusuario:any;
 result:any[]=[];
 datoscliente:any;

  constructor(public router:Router,public sqlite: SQLite,private http:HttpClient) { }

  ngOnInit() {
  }



      ionViewWillEnter(){

  this.cliente(); 
   
  //cliente prueba 
 // this.loaddatacliente(20);

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
            this.idusuario=this.result[0]['idusuario'];
          console.log('masy db user ',this.result[0]['idusuario']);
          this.loaddatacliente(this.result[0]['idusuario']);
          }else{
           console.log('no logedo');
          }

          console.log(this.result);
        })
        .catch(e =>console.log(e));
      })
      .catch(e => console.log(e));
    }





      loaddatacliente(id_cliente:any){


            var senData= JSON.stringify({id_cliente:id_cliente});

      console.log('datos a datoscliente',senData);

      this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/Datoscliente.php',senData)
      .subscribe(data=>{
          console.log(data,'data cliente');
      this.datoscliente=data;
        },
        error=>{
        console.log(error);
      });

      }


      goajustes(){

        this.router.navigateByUrl('/perfilajustes');

      }


}
