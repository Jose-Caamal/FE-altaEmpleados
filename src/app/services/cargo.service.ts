import { Injectable } from '@angular/core';
import { environments } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Cargo } from '../interfaces/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private myAppUrl: string = environments.endpoint;
  private myAppiUrl: string = 'api/cargo/'
  constructor( private http: HttpClient) { }

    getCargo(): Observable<Cargo[]>{
      return this.http.get<Cargo[]>(`${this.myAppUrl}${this.myAppiUrl}`);
    }
}
