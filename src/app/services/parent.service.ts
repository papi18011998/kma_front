import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Parent} from "../models/parent";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
 parents!:any
  constructor(private httpClient:HttpClient) { }
  public getParents():Observable<any>{
    this.httpClient.get(`${environment.apiUrl}/parents`).subscribe({
      next:(data)=>{
        this.parents=data
      }
    })
    return this.httpClient.get(`${environment.apiUrl}/parents`)
  }

  searchParent(nom: string) {
  }
  public addParent(parent:Parent){
    this.httpClient.post(`${environment.apiUrl}/parents`,parent).subscribe({
      next:(data)=>{this.parents={...data}},
      error:(error)=>console.log(error)
    })
    return of(this.parents)
  }
}
