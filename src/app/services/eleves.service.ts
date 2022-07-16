import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Eleve} from "../models/eleve";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ElevesService {
  eleves!:any
  constructor(private httpClient: HttpClient) { }
  public getEleves(){
    this.httpClient.get(`${environment.apiUrl}/eleves`).subscribe({
      next:(data)=>this.eleves=data
    })
    return this.httpClient.get(`${environment.apiUrl}/eleves`)
    }

  addEleve(eleve: Eleve) {
    this.httpClient.post(`${environment.apiUrl}/eleves`, eleve).subscribe({
      next:(data)=>this.eleves={...data}
    })
    return of(this.eleves)
  }
}
