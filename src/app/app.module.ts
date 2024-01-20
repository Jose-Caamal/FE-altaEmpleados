import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AgregarEditarEmpleadoComponent } from './components/agregar-editar-empleado/agregar-editar-empleado.component';
import { ListadoEmpleadoComponent } from './components/listado-empleado/listado-empleado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// import {CdkTableModule} from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AgregarEditarEmpleadoComponent,
    ListadoEmpleadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // CdkTableModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
