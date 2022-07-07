import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdminsComponent } from './components/admins/admins.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import {ReactiveFormsModule} from "@angular/forms";
import { FormAdminComponent } from './components/form-admin/form-admin.component';
import { ProfesseursComponent } from './components/professeurs/professeurs.component';
import { ClassesComponent } from './components/classes/classes.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminsComponent,
    FormAdminComponent,
    ProfesseursComponent,
    ClassesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [MenuComponent,AppComponent]
})
export class AppModule { }
