import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerproductocategoriaPage } from './verproductocategoria.page';

const routes: Routes = [
  {
    path: '',
    component: VerproductocategoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerproductocategoriaPage]
})
export class VerproductocategoriaPageModule {}
