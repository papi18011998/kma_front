import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {Admin} from "../models/admin";

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private httpClient: HttpClient) {
  }
  admins!:any
  public getAdmins():Observable<any>{

    this.httpClient.get(`${environment.apiUrl}/administrateurs`).subscribe({
      next:(data)=>this.admins=data
    })
    return this.httpClient.get(`${environment.apiUrl}/administrateurs`)
  }
  public searchAdmin(nom:string){
      return this.admins.filter((admin:Admin)=>admin.prenom.toLowerCase().includes(nom.toLowerCase()))
  }
  public getGenres(){
    return this.httpClient.get(`${environment.apiUrl}/genres`)
  }
  public findByLogin(login:string){
    return this.httpClient.get(`${environment.apiUrl}/utilisateurs/login/${login}`)
  }
  public findByTelephone(telephone:string){
    return this.httpClient.get(`${environment.apiUrl}/utilisateurs/telephone/${telephone}`)
  }

  public addAdmin(admin:Admin){
    this.httpClient.post(`${environment.apiUrl}/administrateurs`,admin).subscribe({
      next:(data)=>this.admins ={...data},
      error:(error)=>console.log(error)
    })
    return of(this.admins)
}
  public changeStatus(id:number){
    return this.httpClient.put(`${environment.apiUrl}/utilisateurs/status/${id}`,{})
  }
}
