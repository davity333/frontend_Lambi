import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Pages/home/components/header/header.component';
import { IntroductionComponent } from './Pages/home/components/introduction/introduction.component';
import { OfrecerComponent } from './Pages/home/components/ofrecer/ofrecer.component';
import { SugerenciasComponent } from './Pages/home/components/sugerencias/sugerencias.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { DeliciosoComponent } from './Pages/home/components/delicioso/delicioso.component';
import { ComunicacionComponent } from './Pages/home/components/comunicacion/comunicacion.component';

import { AgregarPuestoComponent } from './Pages/agregar-puesto/agregar-puesto.component';
import { DatosNegocioComponent } from './Pages/agregar-puesto/Components/datos-negocio/datos-negocio.component';
import { MapaComponent } from './Pages/agregar-puesto/Components/mapa/mapa.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GestionProductosComponent } from './Pages/gestion-productos/gestion-productos.component';
import { TablaComponent } from './Pages/gestion-productos/Components/tabla/tabla.component';
import { DatosComponent } from './Pages/gestion-productos/Components/datos/datos.component';
import { CommonModule } from '@angular/common';
import { FormControl,ReactiveFormsModule,FormGroup } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxToastNotifierModule } from 'ngx-toast-notifier';
import { NegociosComponent } from './Pages/negocios/negocios.component';
import { BusquedaComponent } from './Pages/busqueda/busqueda.component';
import { HeaderAdminComponent } from './Pages/home/components/header-admin/header-admin.component';
import { FavoritesComponent } from './Pages/favorites/favorites.component';

import { ViewstandComponent } from './Pages/viewstand/components/viewstand/viewstand.component';
import { SectionviewstandComponent } from './Pages/viewstand/components/sectionviewstand/sectionviewstand.component';
import { ProductstandComponent } from './Pages/viewstand/components/productstand/productstand.component';
import { RolComponent } from './Pages/user-option/components/rol/rol.component';

import { AppCardStandSellerComponent } from './Pages/negocios/components/app-card-stand-seller/app-card-stand-seller.component';
import { LoginSellerComponent } from './Pages/loginSeller/components/login-seller/login-seller.component';
import { RegisterSellerComponent } from './Pages/registerSeller/components/register-seller/register-seller.component';
import { CardsComponent } from './Pages/agregar-puesto/Components/cards/cards.component';
import { ProductsComponent } from './Pages/products/products.component';
import { CardProductComponent } from './Pages/products/Components/card-product/card-product.component';
import { ViewProductsComponent } from './Pages/products/Components/view-products/view-products.component';
import { ConfirmationComponent } from './Pages/Alerts/confirmation/confirmation.component';
import { NegationComponent } from './Pages/Alerts/negation/negation.component';
import { InterrogationComponent } from './Pages/Alerts/interrogation/interrogation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    IntroductionComponent,
    OfrecerComponent,
    SugerenciasComponent,
    DeliciosoComponent,
    ComunicacionComponent,
    AgregarPuestoComponent,
    DatosNegocioComponent,
    MapaComponent,
    GestionProductosComponent,
    TablaComponent,
    DatosComponent,
    NegociosComponent,
    BusquedaComponent,
    HeaderAdminComponent,
    FavoritesComponent,
    ViewstandComponent,
    SectionviewstandComponent,
    ProductstandComponent,
    RolComponent,
    AppCardStandSellerComponent,
    LoginSellerComponent,
    RegisterSellerComponent,
    CardsComponent,
    ProductsComponent,
    CardProductComponent,
    ViewProductsComponent,
    ConfirmationComponent,
    NegationComponent,
    InterrogationComponent,
    ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,  //este el router-outlet
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxToastNotifierModule.forRoot()
  ],
  exports: [
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
