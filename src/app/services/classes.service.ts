import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Classe} from "../models/classe";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  classes!:Classe[]
  constructor(private httpClient:HttpClient) { }
  public getClasses():Observable<Classe[]>{
    this.httpClient.get<Classe[]>(environment.apiUrl+'/classes').subscribe({
      next:(data)=>this.classes = data,
      error:(error)=>console.log(error)
    })
    return this.httpClient.get<Classe[]>(environment.apiUrl+'/classes')
  }

  searchClasses(nom: string) {
    return this.classes.filter((classe:Classe) => classe.libelle.toLowerCase().includes(nom.toLowerCase()))
  }
}
