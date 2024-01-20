import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListadoEmpleadoComponent } from './components/listado-empleado/listado-empleado.component';
import { AgregarEditarEmpleadoComponent } from './components/agregar-editar-empleado/agregar-editar-empleado.component';

const routes: Routes = [
  {path: '', redirectTo: 'listEmpleados' ,pathMatch: 'full'},
  {path: 'listEmpleados', component:  ListadoEmpleadoComponent},
  {path: 'agregarEmpleado', component: AgregarEditarEmpleadoComponent},
  {path: 'editarEmpleado/:id', component: AgregarEditarEmpleadoComponent},
  //Redireccionamos cuando no se encuentra la ruta
  {path: '**', redirectTo: 'listEmpleados' ,pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
