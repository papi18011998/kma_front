import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminsComponent} from "./components/admins/admins.component";
import {FormAdminComponent} from "./components/form-admin/form-admin.component";

const routes: Routes = [
  {path:"admins", component: AdminsComponent},
  {path:"admins/add", component:FormAdminComponent},
  {path:"utilisateurs/:id", component:FormAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
