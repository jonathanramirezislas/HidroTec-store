import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {Router} from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.page.html',
  styleUrls: ['./autenticacion.page.scss'],
})
export class AutenticacionPage implements OnInit {

  constructor(public menuCtrl: MenuController,public sqlite: SQLite,public toastController: ToastController,public router:Router,private http:HttpClient) { }
  idusuario:any;
  email:any;
  result:any[]=[];
  ngOnInit() {



  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  this.cliente();
    this.enviaremail();
  }

  enviaremail(){
    this.enviarcorreo();
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
            this.result.push({idusuario:res.rows.item(i).idusuario,email:res.rows.item(i).email});
          }
          console.log('usuario logeado',this.result[0]['idusuario']);
          console.log('email  es :',this.result[0]['email']);
          
          this.idusuario= this.result[0]['idusuario'];
          this.email=this.result[0]['email'];
          

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



  enviarcorreo(){
    var email_cliente=this.result[0]['email'];
    var id_cliente=this.result[0]['idusuario'];
    var senData= JSON.stringify({id_cliente:id_cliente,email:email_cliente});
    console.log(senData);
    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/sendemailcodigo.php',senData)
    .subscribe(data => {
      this.presentToast("Se ha enviado codigo!!Verifique su bandeja de entrada ,Revise los correos no desiados");


    },
    error => {
      console.log("No se envio email");
      console.log(error);

    });

  }



  goiniciarsession(){

this.router.navigate(['/iniciarsession']);

  }


  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      duration: 4000
    });
    toast.present();
  }


  validarcodigo(){

    var codigo  =  (<HTMLInputElement>document.getElementById("codigo")).value;
    var id_cliente=this.result[0]['idusuario'];
    var senData= JSON.stringify({codigo:codigo,id_cliente:id_cliente});
    console.log(senData);
    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/sesioncodigo.php',senData)
    .subscribe(data => {
    

      if(data!=0){
        console.log("corecto codigo");
        this.gohome();
      }else{
        this.presentToast('Codigo incorrecto');
        
      }

    },
    error => {

    });

  }


  gohome(){
    this.router.navigate(['/inicio']);//home
  
    }


    Cerrarsesion(){
      this.sqlite.create({
        name: 'ntvslite.db',
        location:'default'
      })
      .then((db:SQLiteObject)=>{
        db.executeSql('delete  FROM usuarios where log=1',[])
        .then(()=>{
    
            this.gologin();
          console.log('se elimino de sqlite');
    
        })
        .catch(e =>console.log(e));
      })
      .catch(e => console.log(e));
    
    
    }

    gologin(){
      this.router.navigateByUrl('/iniciarsession');
}



}
