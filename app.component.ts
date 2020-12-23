import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

    //ARRAY
    public appPages=[
  {title:'Inicio',
   url:'/inicio',
   icon:'home'
},
  {title:'Mi cuenta',
   url:'/micuenta',
   icon:'person'
},
{title:'Pedidos',
 url:'/historial',
 icon:'pricetags'
},
{title:'wishlist',
 url:'/wishlist',
 icon:'star'
},
{title:'categoria',
 url:'/categorias',
 icon:'list-box'
},
{title:'Sobre nosotros',
 url:'/empresa',
 icon:'business'
}

];





  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
