import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Professeur} from "../models/professeur";

@Injectable({
  providedIn: 'root'
})
export class ProfesseursService {
  professseurs!:any
  constructor( private httpClient:HttpClient) { }
  public getProfesseurs():Observable<any>{
    this.httpClient.get(`${environment.apiUrl}/professeurs`).subscribe({
      next:(data)=>{
        this.professseurs=data
      }
    })
    return this.httpClient.get(`${environment.apiUrl}/professeurs`)
  }
  public getMateires(){
    return this.httpClient.get(`${environment.apiUrl}/matieres`)
  }
  public addProfesseur(professeur:Professeur){
     this.httpClient.post(`${environment.apiUrl}/professeurs`,professeur).subscribe({
       next:(data)=> this.professseurs={...data},
       error:(error)=>console.log(error)
     })
    return of(this.professseurs)
  }
}
