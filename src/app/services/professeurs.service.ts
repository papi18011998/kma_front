import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Professeur} from "../models/professeur";
import {ProfesseurModelGet} from "../models/professeur-model-get";
import {Matiere} from "../models/matiere";

@Injectable({
  providedIn: 'root'
})
export class ProfesseursService {
  professseurs!:ProfesseurModelGet[]
  constructor( private httpClient:HttpClient) { }
  public getProfesseurs():Observable<ProfesseurModelGet[]>{
    this.httpClient.get<ProfesseurModelGet[]>(`${environment.apiUrl}/professeurs`).subscribe({
      next:(data)=>{
        this.professseurs=data
      }
    })
    return this.httpClient.get<ProfesseurModelGet[]>(`${environment.apiUrl}/professeurs`)
  }
  public getMateires(){
    return this.httpClient.get<Matiere[]>(`${environment.apiUrl}/matieres`)
  }
  public addProfesseur(professeur:Professeur){
     return this.httpClient.post(`${environment.apiUrl}/professeurs`,professeur)
  }

  updateProfesseur(professeur: Professeur) {
    return this.httpClient.put(`${environment.apiUrl}/professeurs/${professeur.professeurDTO.id}`,professeur)
  }

  searchProfesseur(nom: string) {
    return this.professseurs.filter((professeur:any)=>professeur.prenom.toLowerCase().includes(nom.toLowerCase()))
  }
}
