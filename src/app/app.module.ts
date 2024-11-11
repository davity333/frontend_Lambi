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
import { GestionPuestoComponent } from './Pages/gestion-puesto/gestion-puesto.component';
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
    GestionPuestoComponent,
    AgregarPuestoComponent,
    MapaComponent,
    DatosNegocioComponent,
    GestionProductosComponent,
    TablaComponent,
    DatosComponent,
    ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,  //este el router-outlet
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    RegisterComponent
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
