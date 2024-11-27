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
import { FormsModule } from '@angular/forms';
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
import { RouterModule } from '@angular/router';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';
import { ModalProductComponent } from './Pages/gestion-productos/Components/modal-product/modal-product.component';
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

import { ModalComponent } from './Pages/viewstand/components/modal/modal.component';
import { CardSugerantionComponent } from './Pages/home/components/card/card-sugerantion/card-sugerantion.component';
import { PaymentComponent } from './Pages/payment/payment.component';
import { ModalViewComponent } from './Pages/products/Components/modal-view/modal-view.component';
import { FavoriteByBuyerComponent } from './Pages/agregar-puesto/Components/favorite-by-buyer/favorite-by-buyer.component';
import { LoaderComponent } from './loader/loader.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AllProductsComponent } from './Pages/all-products/components/all-products/all-products.component';
import { NothingInPageComponent } from './nothing-in-page/nothing-in-page.component';
import { ServicesStandsComponent } from './Pages/services/components/services-stands/services-stands.component';
import { WaitingLocationComponent } from './waiting-location/waiting-location.component';
import { SendMessageComponent } from './Pages/sendMessage/send-message/send-message.component';
import { SucefullComponent } from './Pages/sendMessage/components/sucefull/sucefull.component';
import { SectionSellComponent } from './Pages/sendMessage/components/section-sell/section-sell.component';
import { QuestionComponent } from './question/question.component';


import { TimeFormatPipe } from './pipes/time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NothingInPageComponent,
    ModalProductComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AllProductsComponent,
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
    ModalComponent,
    PaymentComponent,
    ModalViewComponent,
    FavoriteByBuyerComponent,
    LoaderComponent,
    ErrorPageComponent,
    AllProductsComponent,
    NothingInPageComponent,
    ServicesStandsComponent,
    WaitingLocationComponent,
    SendMessageComponent,
    SucefullComponent,
    SectionSellComponent,
    CardSugerantionComponent,
    QuestionComponent,
    TimeFormatPipe,
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, //este el router-outlet
    GoogleMapsModule,  
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    NgxToastNotifierModule.forRoot(),
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
