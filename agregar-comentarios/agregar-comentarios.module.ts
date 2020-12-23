import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarComentariosPage } from './agregar-comentarios.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarComentariosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarComentariosPage]
})
export class AgregarComentariosPageModule {}
