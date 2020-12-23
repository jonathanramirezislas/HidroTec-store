import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarComentarioPage } from './agregar-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarComentarioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarComentarioPage]
})
export class AgregarComentarioPageModule {}
