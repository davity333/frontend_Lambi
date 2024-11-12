import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AgregarPuestoComponent } from './Pages/agregar-puesto/agregar-puesto.component';
import { GestionProductosComponent } from './Pages/gestion-productos/gestion-productos.component';
import { NegociosComponent } from './Pages/negocios/negocios.component';
import { BusquedaComponent } from './Pages/busqueda/busqueda.component';
const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'crearPuesto', component: AgregarPuestoComponent},
  {path: 'gestionProducto', component: GestionProductosComponent},
  {path: 'negocios', component: NegociosComponent},
  {path: 'busqueda', component: BusquedaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
