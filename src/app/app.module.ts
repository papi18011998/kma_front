import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdminsComponent } from './components/admins/admins.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";
import { ReactiveFormsModule} from "@angular/forms";
import { FormAdminComponent } from './components/form-admin/form-admin.component';
import { ProfesseursComponent } from './components/professeurs/professeurs.component';
import { ClassesComponent } from './components/classes/classes.component';
import { FormProfesseurComponent } from './components/form-professeur/form-professeur.component';
import { ParentsComponent } from './components/parents/parents.component';
import { ElevesComponent } from './components/eleves/eleves.component';
import { FormEleveComponent } from './components/form-eleve/form-eleve.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from "@angular/material/stepper";
import { FormParentComponent } from './components/form-parent/form-parent.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminsComponent,
    FormAdminComponent,
    ProfesseursComponent,
    ClassesComponent,
    FormProfesseurComponent,
    ParentsComponent,
    ElevesComponent,
    FormEleveComponent,
    FormParentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [MenuComponent,AppComponent]
})
export class AppModule { }
