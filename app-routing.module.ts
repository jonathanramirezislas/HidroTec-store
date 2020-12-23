import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'iniciarsession', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'micuenta', loadChildren: './micuenta/micuenta.module#MicuentaPageModule' },
  { path: 'busqueda/:palabra', loadChildren: './busqueda/busqueda.module#BusquedaPageModule' },
  { path: 'compras/:id/:cantidad', loadChildren: './compras/compras.module#ComprasPageModule' },
    { path: 'compras', loadChildren: './compras/compras.module#ComprasPageModule' },

  { path: 'billetera', loadChildren: './billetera/billetera.module#BilleteraPageModule' },
  { path: 'categorias', loadChildren: './categorias/categorias.module#CategoriasPageModule' },
  { path: 'inicio', loadChildren: './inicio/inicio.module#InicioPageModule' },
  { path: 'iniciarsession', loadChildren: './iniciarsession/iniciarsession.module#IniciarsessionPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'detalle/:id', loadChildren: './detalle/detalle.module#DetallePageModule' },
  { path: 'carrito', loadChildren: './carrito/carrito.module#CarritoPageModule' },
  { path: 'historial', loadChildren: './historial/historial.module#HistorialPageModule' },
  { path: 'misdatos', loadChildren: './misdatos/misdatos.module#MisdatosPageModule' },
  { path: 'editardatos', loadChildren: './editardatos/editardatos.module#EditardatosPageModule' },
  { path: 'wishlist', loadChildren: './wishlist/wishlist.module#WishlistPageModule' },
  { path: 'pedidos', loadChildren: './pedidos/pedidos.module#PedidosPageModule' },
  { path: 'comentarios/:id', loadChildren: './comentarios/comentarios.module#ComentariosPageModule' },
  { path: 'recoverpass', loadChildren: './recoverpass/recoverpass.module#RecoverpassPageModule' },
  { path: 'empresa', loadChildren: './empresa/empresa.module#EmpresaPageModule' },
  { path: 'imagen', loadChildren: './imagen/imagen.module#ImagenPageModule' },
  { path: 'image-modal', loadChildren: './image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'agregar-comentarios', loadChildren: './agregar-comentarios/agregar-comentarios.module#AgregarComentariosPageModule' },
  { path: 'agregar-comentario', loadChildren: './agregar-comentario/agregar-comentario.module#AgregarComentarioPageModule' },
  { path: 'addcomentario/:id', loadChildren: './addcomentario/addcomentario.module#AddcomentarioPageModule' },
  { path: 'verproductocategoria/:id', loadChildren: './verproductocategoria/verproductocategoria.module#VerproductocategoriaPageModule' },
  { path: 'perfilajustes', loadChildren: './perfilajustes/perfilajustes.module#PerfilajustesPageModule' },
  { path: 'autenticacion', loadChildren: './autenticacion/autenticacion.module#AutenticacionPageModule' },
  { path: 'faq', loadChildren: './faq/faq.module#FAQPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
