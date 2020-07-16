import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl,ValidatorFn,AbstractControl } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import{ HttpClient} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-iniciarsession',
  templateUrl: './iniciarsession.page.html',
  styleUrls: ['./iniciarsession.page.scss'],
})
export class IniciarsessionPage implements OnInit {
  db:SQLiteObject=null;
   idusuario:any;
   result:any[]=[];

constructor(public menuCtrl: MenuController,private network: Network,public loadingController: LoadingController,private http:HttpClient,public toastController: ToastController,public sqlite: SQLite,public router:Router){}

ionViewWillEnter(){
  this.menuCtrl.enable(false);
 this.create();
 this.session();

 }
  signupform: FormGroup;
  userData = {  "password": "", "email": "" };



  ngOnInit() {
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.signupform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }




  registro(){


     this.router.navigateByUrl('/registro');

 }
 recoverpas(){


    this.router.navigateByUrl('/recoverpass');

}




//sqllite

login(){

    var email  =  (<HTMLInputElement>document.getElementById("email")).value;
    var password  =  this.SHA1((<HTMLInputElement>document.getElementById("password")).value);//usando encryptacion
    var senData= JSON.stringify({email:email,password:password});
    console.log('entro a login',senData);
    this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/login.php',senData)
    .subscribe(data=>{
      console.log(data);
  this.presentToast(data['id_cliente']);
        if(data!=0){
        var id :number=data['id_cliente'];
    //    this.presentToast(id);
          this.check(id);
        }else{
          this.presentToast('email y/o contraseña incorrectos');
        }
      },
      error=>{
      this.presentToast('problemas de  conexion');
    });
  }

  gohome(){
  this.router.navigate(['/inicio']);//home

  }

  validacion(){
    this.router.navigate(['/autenticacion']);//autenticacion
  }




create(){

  this.sqlite.create({
    name: 'ntvslite.db',
    location:'default'
  })
  .then((db:SQLiteObject)=>{
    db.executeSql('CREATE TABLE usuarios (idusuario int(11) NOT NULL,email varchar(20) NOT NULL,password varchar(50) NOT NULL,log int(11) NOT NULL)',[])
    .then(()=>{
    })
    .catch(e =>console.log(e));
  })
  .catch(e => console.log(e));

}

insert(id:any){
  var email  =  (<HTMLInputElement>document.getElementById("email")).value;
  var password  =  this.SHA1((<HTMLInputElement>document.getElementById("password")).value);//usando encryptacion

  this.sqlite.create({
    name: 'ntvslite.db',
    location:'default'
  })
  .then((db:SQLiteObject)=>{

    db.executeSql('INSERT INTO usuarios (idusuario, email, password, log) VALUES (?,?,?,?);',[id,email,password,'1'])
    .then(()=>{
      console.log('Element Inserted');

      console.log('se creo ususario en sqlite');
      console.log("email: ",email);
      this.correcto();
//this.gohome();
this.validacion();
    })
    .catch(e =>console.log(e));
  })
  .catch(e => console.log(e));
}





check(id:any){
  this.sqlite.create({
    name: 'ntvslite.db',
    location:'default'
  })
  .then((db:SQLiteObject)=>{
    db.executeSql('SELECT * FROM usuarios where idusuario=?',[id])
    .then((res)=>{
      this.result=[];

      if(res.rows.length>0){

        for(var i=0;i<res.rows.length;i++){
          this.result.push({email:res.rows.item(i).email,password:res.rows.item(i).password});
        }
        //this.presentToast('se encuentra en bd ya');
        this.validar(id,this.result[0]['email'],this.result[0]['password']);

      }else{
       this.insert(id);

      }
      console.log(this.result);




    })
    .catch(e =>console.log(e));
  })
  .catch(e => console.log(e));
}


validar(id:any,email:any,password:any){


  var senData= JSON.stringify({cliente_id:id,email:email,password:password});

  this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/login.php',senData)
  .subscribe(data=>{
      console.log(data,'data');

      if(data!=0){
        this.correcto();

       // this.gohome();
       this.validacion();
      }else{
        this.presentToast('Se cambio contraseña contraseña ');
        this.eliminar(id);
      }
    },
    error=>{
    console.log(error);
  });

}




eliminar(id:any){
  this.sqlite.create({
    name: 'ntvslite.db',
    location:'default'
  })
  .then((db:SQLiteObject)=>{
    db.executeSql('delete  FROM usuarios where idusuario=?',[id])
    .then(()=>{

     // this.presentToast('Se elimino');
      console.log('se elimino de sqlite');

    })
    .catch(e =>console.log(e));
  })
  .catch(e => console.log(e));
}





session(){
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
          this.result.push({idusuario:res.rows.item(i).idusuario,email:res.rows.item(i).email,password:res.rows.item(i).password});
        }
       this.validar(this.result[0]['idusuario'],this.result[0]['email'],this.result[0]['password']);
      }else{

      }




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



    async correcto() {
        const loading = await this.loadingController.create({
          spinner: null,
          duration: 5000,
          message: 'Porfavor espere...',
          translucent: true,
          cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
      }


      //ver constraseña
        isActiveToggleTextPassword: Boolean = true;
        public toggleTextPassword(): void{
            this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
        }
        public getType() {
            return this.isActiveToggleTextPassword ? 'password' : 'text';
        }


        ionViewDidEnter(){

  let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    let msg=('Red desconectada !');
     this.presentToast(msg);
  });


  let connectSubscription = this.network.onConnect().subscribe(() => {
    let msg=('Red es conectada!');
     this.presentToast(msg);

    setTimeout(() => {
      if (this.network.type === 'wifi') {
        let msg=('Network connection is Wifi');
         this.presentToast(msg);
      }
    }, 3000);
  });
}



/**
* Secure Hash Algorithm (SHA1)
* http://www.webtoolkit.info/
**/
 SHA1(msg) {
  function rotate_left(n,s) {
  var t4 = ( n<<s ) | (n>>>(32-s));
  return t4;
  };
  function lsb_hex(val) {
  var str='';
  var i;
  var vh;
  var vl;
  for( i=0; i<=6; i+=2 ) {
  vh = (val>>>(i*4+4))&0x0f;
  vl = (val>>>(i*4))&0x0f;
  str += vh.toString(16) + vl.toString(16);
  }
  return str;
  };
  function cvt_hex(val) {
  var str='';
  var i;
  var v;
  for( i=7; i>=0; i-- ) {
  v = (val>>>(i*4))&0x0f;
  str += v.toString(16);
  }
  return str;
  };
  function Utf8Encode(string) {
  string = string.replace(/\r\n/g,'\n');
  var utftext = '';
  for (var n = 0; n < string.length; n++) {
  var c = string.charCodeAt(n);
  if (c < 128) {
  utftext += String.fromCharCode(c);
  }
  else if((c > 127) && (c < 2048)) {
  utftext += String.fromCharCode((c >> 6) | 192);
  utftext += String.fromCharCode((c & 63) | 128);
  }
  else {
  utftext += String.fromCharCode((c >> 12) | 224);
  utftext += String.fromCharCode(((c >> 6) & 63) | 128);
  utftext += String.fromCharCode((c & 63) | 128);
  }
  }
  return utftext;
  };
  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  msg = Utf8Encode(msg);
  var msg_len = msg.length;
  var word_array = new Array();
  for( i=0; i<msg_len-3; i+=4 ) {
  j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
  msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
  word_array.push( j );
  }
  switch( msg_len % 4 ) {
  case 0:
  i = 0x080000000;
  break;
  case 1:
  i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
  break;
  case 2:
  i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
  break;
  case 3:
  i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8 | 0x80;
  break;
  }
  word_array.push( i );
  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  word_array.push( msg_len>>>29 );
  word_array.push( (msg_len<<3)&0x0ffffffff );
  for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ) {
  for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
  for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
  A = H0;
  B = H1;
  C = H2;
  D = H3;
  E = H4;
  for( i= 0; i<=19; i++ ) {
  temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
  E = D;
  D = C;
  C = rotate_left(B,30);
  B = A;
  A = temp;
  }
  for( i=20; i<=39; i++ ) {
  temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
  E = D;
  D = C;
  C = rotate_left(B,30);
  B = A;
  A = temp;
  }
  for( i=40; i<=59; i++ ) {
  temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
  E = D;
  D = C;
  C = rotate_left(B,30);
  B = A;
  A = temp;
  }
  for( i=60; i<=79; i++ ) {
  temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
  E = D;
  D = C;
  C = rotate_left(B,30);
  B = A;
  A = temp;
  }
  H0 = (H0 + A) & 0x0ffffffff;
  H1 = (H1 + B) & 0x0ffffffff;
  H2 = (H2 + C) & 0x0ffffffff;
  H3 = (H3 + D) & 0x0ffffffff;
  H4 = (H4 + E) & 0x0ffffffff;
  }
  var tempo = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
 console.log("hash1 :",tempo);
  return tempo.toLowerCase();
 }

}
