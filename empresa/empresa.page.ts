import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {

  constructor(public router:Router,private callNumber: CallNumber) { }

  ngOnInit() {
  }

  gohome(){
         this.router.navigateByUrl('/inicio');
  }

  ventas(){
    this.callNumber.callNumber("4491800626", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
  mayoreo(){
    this.callNumber.callNumber("4499088240", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }
  dudas(){
    this.callNumber.callNumber("4491906204", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));

  }

}
