import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/shared/login/login.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { RegisterComponent } from './components/shared/register/register.component';
import { ClasificationComponent } from './components/clasification/clasification.component';
import { PackageComponent } from './components/package/package.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'supplier', component: SupplierComponent },
    { path: 'clasification', component: ClasificationComponent },
    { path: 'package', component: PackageComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule { }