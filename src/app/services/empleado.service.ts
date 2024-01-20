import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private myAppUrl: string = environments.endpoint;
  private myAppiUrl: string = 'api/empleado/'
  private myAppiUrlEstatus: string = 'api/empleado/estatus/'
  constructor( private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.myAppUrl}${this.myAppiUrl}`);
  }

  getEmpleado(id: number): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.myAppUrl}${this.myAppiUrl}${id}`);
  }

  deleteEmpleado(id: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myAppiUrl}${id}`);
  }

  cambiarEstatusEmpleado(id: number, nuevoEstatus: boolean): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myAppiUrlEstatus}${id}`,nuevoEstatus);
  }

  addEmpleado(empleado: any): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.myAppUrl}${this.myAppiUrl}`,empleado);
  }

  updateEmpleado(id: number, empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.myAppUrl}${this.myAppiUrl}${id}`,empleado);
  }

}
