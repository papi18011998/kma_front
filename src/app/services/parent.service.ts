import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Parent} from "../models/parent";
import {ParentModelGet} from "../models/parent-model-get";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
 parents!:ParentModelGet[]
  constructor(private httpClient:HttpClient) { }
  public getParents():Observable<ParentModelGet[]>{
    this.httpClient.get<ParentModelGet[]>(`${environment.apiUrl}/parents`).subscribe({
      next:(data)=>{
        this.parents=data
      }
    })
    return this.httpClient.get<ParentModelGet[]>(`${environment.apiUrl}/parents`)
  }

  searchParent(nom: string) {
  }
  public addParent(parent:Parent){
    return this.httpClient.post(`${environment.apiUrl}/parents`,parent)
  }
}
