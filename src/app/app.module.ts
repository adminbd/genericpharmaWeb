import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

// rutas
import { APP_ROUTING } from './app.routes';

// servicios
import { ContentHeaderService } from './servicios/content-header.service';
import { SessionService } from './servicios/session.service';

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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    DataTablesModule
  ],
  providers: [
    ContentHeaderService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
