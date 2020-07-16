import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';




@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.page.html',
  styleUrls: ['./imagen.page.scss'],
})
export class ImagenPage implements OnInit {
img: any;
sliderOpts={
  zoom:{
    maxRatio:3
  }
};
constructor() { }

//public photoViewer: PhotoViewer
//constructor() { }

  ngOnInit() {
  }





zoom(zoomIn:boolean){

}



}
