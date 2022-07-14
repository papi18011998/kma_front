import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

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
}
