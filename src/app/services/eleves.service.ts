import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Eleve} from "../models/eleve";
import {Observable, of} from "rxjs";
import {EleveModelGet} from "../models/eleve-model-get";

@Injectable({
  providedIn: 'root'
})
export class ElevesService {
  eleves!: EleveModelGet[]|any
  constructor(private httpClient: HttpClient) { }
  public getEleves():Observable<EleveModelGet[]>{
    this.httpClient.get<EleveModelGet[]>(`${environment.apiUrl}/eleves`).subscribe({
      next:(data)=>this.eleves=data
    })
    return this.httpClient.get<EleveModelGet[]>(`${environment.apiUrl}/eleves`)
    }

  addEleve(eleve: Eleve) {
    this.httpClient.post(`${environment.apiUrl}/eleves`, eleve).subscribe({
      next:(data)=>this.eleves={...data}
    })
    return of(this.eleves)
  }
}
