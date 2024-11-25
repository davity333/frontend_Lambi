import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AgregarPuestoComponent } from './Pages/agregar-puesto/agregar-puesto.component';
import { GestionProductosComponent } from './Pages/gestion-productos/gestion-productos.component';
import { NegociosComponent } from './Pages/negocios/negocios.component';
import { BusquedaComponent } from './Pages/busqueda/busqueda.component';
import { ModalProductComponent } from './Pages/gestion-productos/Components/modal-product/modal-product.component';
import { loginGuard } from '../guards/login.guard';
import { FavoritesComponent } from './Pages/favorites/favorites.component';
import { ViewstandComponent } from './Pages/viewstand/components/viewstand/viewstand.component';
import { RolComponent } from './Pages/user-option/components/rol/rol.component';
import { RegisterSellerComponent } from './Pages/registerSeller/components/register-seller/register-seller.component';
import { LoginSellerComponent } from './Pages/loginSeller/components/login-seller/login-seller.component';
import { ProductsComponent } from './Pages/products/products.component';
import { PaymentComponent } from './Pages/payment/payment.component';
import { ModalViewComponent } from './Pages/products/Components/modal-view/modal-view.component';
import { ServicesStandsComponent } from './Pages/services/components/services-stands/services-stands.component';
import { AllProductsComponent } from './Pages/all-products/components/all-products/all-products.component';
import { SendMessageComponent } from './Pages/sendMessage/send-message/send-message.component';
import { SectionSellComponent } from './Pages/sendMessage/components/section-sell/section-sell.component';
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

  {path: 'rol', component: RolComponent},


  {path: 'payment', component:PaymentComponent},

  {path: 'productModal', component: ModalViewComponent},

  {path: 'services', component: ServicesStandsComponent},
  {path: 'all-products', component: AllProductsComponent},

  {path: 'sendMessage', component: SendMessageComponent},
  
  {path: 'sells', component: SectionSellComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
