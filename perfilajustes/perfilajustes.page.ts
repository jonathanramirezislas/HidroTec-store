import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,ValidatorFn,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-perfilajustes',
  templateUrl: './perfilajustes.page.html',
  styleUrls: ['./perfilajustes.page.scss'],
})
export class PerfilajustesPage implements OnInit {

estadong:any;
  db:SQLiteObject=null;
   idusuario:any;
   result:any[]=[];
datoscliente:any;
nombredb:any;

    signupform: FormGroup;
    userData = {  "password": "", "email": "", "name": "","apellidos": "","colonia": "","calle": "","num": "","cp":"","telefono":"","estado":"" };
  estados:any;



    constructor(public sqlite: SQLite,public toastController: ToastController,private http:HttpClient,public router:Router) {
    }



    ionViewWillEnter(){

this.loaddataestado();  //descomentar
this.cliente(); //descomentar

//cliente prueba
//this.loaddatacliente(20);
//this.loaddataestado();
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
          console.log('usuario logeado',this.result[0]['idusuario']);
          this.loaddatacliente(this.result[0]['idusuario']);
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




  async loaddataestado(){
  this.http.get('http://proyectosita.com/HIDROTEC/IonicProyecto/estados.php')
  .subscribe(data=>{
    this.estados=data;
    console.log(data);
  },
  error=>{
  console.log(error);
  });
  }

  loaddatacliente(id_cliente:any){

        var senData= JSON.stringify({id_cliente:id_cliente});

  console.log('datos a http clientes',senData);

  this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/Datoscliente.php',senData)
  .subscribe(data=>{
      console.log(data,'data cliente');

  this.datoscliente=data;

console.log('nombre de cliente: ',this.datoscliente[0]['nombre'])


this.userData.email=this.datoscliente[0]['email'];
this.userData.name=this.datoscliente[0]['nombre'];
this.userData.apellidos=this.datoscliente[0]['apellidos'];
this.userData.colonia=this.datoscliente[0]['colonia'];
this.userData.calle=this.datoscliente[0]['calle'];
this.userData.num=this.datoscliente[0]['num'];
this.userData.cp=this.datoscliente[0]['cp'];
this.userData.telefono=this.datoscliente[0]['telefono'];

    },
    error=>{
    console.log(error);
  });

  }




    ngOnInit() {
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      let PHONEPATTERN = /[0-9\+\-\ ]/;
      this.signupform = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        apellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        calle: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        colonia: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        cp: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(3), Validators.maxLength(15)]),
        num: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1), Validators.maxLength(15)]),
        telefono: new FormControl('', [Validators.required, Validators.pattern(PHONEPATTERN), Validators.minLength(4), Validators.maxLength(35)]),
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        estado: new FormControl('', [Validators.required]),
      });


      this.estadong = document.getElementById('estadong1');

    }




      realizarcambios(){
        var id_cliente=this.idusuario;
        var nombre  =  (<HTMLInputElement>document.getElementById("nombre")).value;
        var apellidos  =  (<HTMLInputElement>document.getElementById("apellidos")).value;
        var email  =  (<HTMLInputElement>document.getElementById("email")).value;
        var calle  =  (<HTMLInputElement>document.getElementById("calle")).value;
        var cp  =  (<HTMLInputElement>document.getElementById("cp")).value;
        var telefono  =  (<HTMLInputElement>document.getElementById("telefono")).value;
        var idestado  =  (<HTMLInputElement>document.getElementById("idestado")).value;
        var colonia  =  (<HTMLInputElement>document.getElementById("colonia")).value;
        var num  =  (<HTMLInputElement>document.getElementById("num")).value;

        var senData= JSON.stringify({id_cliente:id_cliente,nombre:nombre,apellidos:apellidos,email:email,calle:calle,cp:cp,telefono:telefono
          ,idestado:idestado,colonia:colonia,num:num
          });
          console.log('Datos a registro',senData);


          this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/cambiosperfil.php',senData)
          .subscribe(data=>{

    if(data==1){
      this.presentToast('Se realisaron los camios');
      this.goiniciarsession();
    }else{
      this.presentToast(data);
    }

          console.log(data,'registro');
            },
            error=>{
            console.log(error);
          });

      }
    goiniciarsession(){

      this.router.navigateByUrl('/misdatos');

    }


    async presentToast(msg) {
          const toast = await this.toastController.create({
            message: msg,
            duration: 2000
          });
          toast.present();
        }






}
