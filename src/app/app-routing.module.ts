import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminsComponent} from "./components/admins/admins.component";
import {FormAdminComponent} from "./components/form-admin/form-admin.component";
import {ClassesComponent} from "./components/classes/classes.component";

const routes: Routes = [
  {path:"admins", component: AdminsComponent},
  {path:"admins/add", component:FormAdminComponent},
  {path:"utilisateurs/:id", component:FormAdminComponent},
  {path:"classes",component:ClassesComponent},
  {path:"classes/add",component:ClassesComponent},
  {path:"classes/:id",component:ClassesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
