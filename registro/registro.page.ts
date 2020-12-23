import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl,ValidatorFn,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import{ HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {



   signupform: FormGroup;
  userData = {  "password": "", "email": "", "name": "","apellidos": "","colonia": "","calle": "","num": "","cp":"","telefono":"","estado":"" };
estados:any;
  constructor(public toastController: ToastController,private http:HttpClient,public router:Router) {
  }



  ionViewWillEnter(){
  this.loaddata();
}

async loaddata(){
this.http.get('http://proyectosita.com/HIDROTEC/IonicProyecto/estados.php')
.subscribe(data=>{
  this.estados=data;
  console.log(data);
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
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      re_password: new FormControl('', [Validators.required,this.equalto('password')]),
      apellidos: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      calle: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      colonia: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      cp: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(4), Validators.maxLength(15)]),
      num: new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(1), Validators.maxLength(15)]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(PHONEPATTERN), Validators.minLength(4), Validators.maxLength(35)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      estado: new FormControl('', [Validators.required]),

    });
  }



  equalto(field_name): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {

  let input = control.value;

  let isValid=control.root.value[field_name]==input
  if(!isValid)
  return { 'equalTo': {isValid} }
  else
  return null;
  };
  }



  registro(){
    var nombre  =  (<HTMLInputElement>document.getElementById("nombre")).value;
    var apellidos  =  (<HTMLInputElement>document.getElementById("apellidos")).value;
    var emails  =  (<HTMLInputElement>document.getElementById("mail")).value;//no se esta usando
    var calle  =  (<HTMLInputElement>document.getElementById("calle")).value;
    var cp  =  (<HTMLInputElement>document.getElementById("cp")).value;
    var telefono  =  (<HTMLInputElement>document.getElementById("telefono")).value;
    var pass =  this.SHA1((<HTMLInputElement>document.getElementById("contraseña")).value);
    var idestado  =  (<HTMLInputElement>document.getElementById("idestado")).value;
    var colonia  =  (<HTMLInputElement>document.getElementById("colonia")).value;
    var num  =  (<HTMLInputElement>document.getElementById("num")).value;

    var senData= JSON.stringify({nombre:nombre,apellidos:apellidos,email:this.userData.email,calle:calle,cp:cp,telefono:telefono
      ,pass:pass,idestado:idestado,colonia:colonia,num:num
      });
      console.log('Datos a registro',senData);


      this.http.post('http://proyectosita.com/HIDROTEC/IonicProyecto/registro.php',senData)
      .subscribe(data=>{

if(data==1){
  this.presentToast('Se realizo registro');
  this.goiniciarsession();
}else{
  this.presentToast('ERROR! Este email ya se encuentra registrado');
}

      console.log(data,'registro');
        },
        error=>{
        console.log(error);
      });

  }
goiniciarsession(){

  this.router.navigateByUrl('/iniciarsession');

}
  async presentToast(msg) {
     const toast = await this.toastController.create({
       message: msg,
       duration: 2000
     });
     toast.present();
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
