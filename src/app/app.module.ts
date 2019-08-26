import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// rutas
import { AppRoutingModule } from './app-routing.module';

// servicios
import { ContentHeaderService } from './servicios/content-header.service';
import { SessionService } from './servicios/session.service';
import { ArticulosService } from './servicios/articulos.service';

// componentes
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ContentHeaderComponent } from './components/shared/content-header/content-header.component';
import { LoginComponent } from './components/shared/login/login.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { CategoryComponent } from './components/category/category.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { RegisterComponent } from './components/shared/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NavbarComponent,
    ProductsComponent,
    MenuComponent,
    FooterComponent,
    ContentHeaderComponent,
    LoginComponent,
    ProfileComponent,
    CategoryComponent,
    SupplierComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgbModule
  ],
  providers: [
    ContentHeaderService,
    SessionService,
    ArticulosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
