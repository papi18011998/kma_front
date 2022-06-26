import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdminsComponent } from './components/admins/admins.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MenuComponent,AppComponent]
})
export class AppModule { }
