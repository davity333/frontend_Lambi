import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AgregarPuestoComponent } from './Pages/agregar-puesto/agregar-puesto.component';
import { GestionProductosComponent } from './Pages/gestion-productos/gestion-productos.component';
import { NegociosComponent } from './Pages/negocios/negocios.component';
import { BusquedaComponent } from './Pages/busqueda/busqueda.component';

import { loginGuard } from '../guards/login.guard';
import { FavoritesComponent } from './Pages/favorites/favorites.component';
import { ViewstandComponent } from './Pages/viewstand/components/viewstand/viewstand.component';
import { RolComponent } from './Pages/user-option/components/rol/rol.component';
import { RegisterSellerComponent } from './Pages/registerSeller/components/register-seller/register-seller.component';
import { LoginSellerComponent } from './Pages/loginSeller/components/login-seller/login-seller.component';
import { ProductsComponent } from './Pages/products/products.component';
const routes: Routes = [
  {path: '', component:RolComponent},
  {path:'home', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'crearPuesto', component: AgregarPuestoComponent, canActivate:[loginGuard]},
  {path: 'gestionProducto', component: GestionProductosComponent},
  {path: 'negocios', component: NegociosComponent},
  {path: 'busqueda', component: BusquedaComponent},
  {path: 'products', component:ProductsComponent},

  {path: 'registerSeller', component:RegisterSellerComponent},
  {path: 'loginSeller', component:LoginSellerComponent},
  {path: 'favorites', component: FavoritesComponent},

  {path: 'viewstand', component: ViewstandComponent},

  {path: 'rol', component: RolComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
