import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminsComponent} from "./components/admins/admins.component";
import {FormAdminComponent} from "./components/form-admin/form-admin.component";
import {ClassesComponent} from "./components/classes/classes.component";
import {ProfesseursComponent} from "./components/professeurs/professeurs.component";
import {FormProfesseurComponent} from "./components/form-professeur/form-professeur.component";
import {ParentsComponent} from "./components/parents/parents.component";
import {ElevesComponent} from "./components/eleves/eleves.component";
import {FormEleveComponent} from "./components/form-eleve/form-eleve.component";
import {FormParentComponent} from "./components/form-parent/form-parent.component";

const routes: Routes = [
  {path:"admins", component: AdminsComponent},
  {path:"admins/add", component:FormAdminComponent},
  {path:"utilisateurs/:id", component:FormAdminComponent},
  {path:"classes",component:ClassesComponent},
  {path:"classes/add",component:ClassesComponent},
  {path:"classes/:id",component:ClassesComponent},
  {path:"professeurs",component:ProfesseursComponent},
  {path:"professeurs/add",component:FormProfesseurComponent},
  {path:"professeurs/:id",component:FormProfesseurComponent},
  {path:"parents" ,component:ParentsComponent},
  {path:"parents/add",component:FormParentComponent},
  {path:"eleves" ,component:ElevesComponent},
  {path:"eleves/add" ,component:FormEleveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
