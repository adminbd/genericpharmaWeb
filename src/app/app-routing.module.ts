import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/shared/login/login.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { CategoryComponent } from './components/category/category.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { RegisterComponent } from './components/shared/register/register.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'supplier', component: SupplierComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule { }