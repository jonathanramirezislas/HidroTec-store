import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Router} from '@angular/router';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {






  @ViewChild('slider', { read: ElementRef })slider: ElementRef;


    img: any;

    sliderOpts = {
      zoom: {
        maxRatio: 5
      }
    };

    constructor(private modalController: ModalController,public router:Router) { }

    ngOnInit() {
    }

    zoom(zoomIn: boolean) {
      let zoom = this.slider.nativeElement.swiper.zoom;
      if (zoomIn) {
        zoom.in();
      } else {
        zoom.out();
      }
    }

    close() {
      this.router.navigate([/detalle/ + '/'+2]);

    }






}
