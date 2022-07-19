import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {Admin} from "../models/admin";
import {Genre} from "../models/genre";

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private httpClient: HttpClient) {
  }
  admins!:Admin[]
  public getAdmins():Observable<Admin[]>{

    this.httpClient.get<Admin[]>(`${environment.apiUrl}/administrateurs`).subscribe({
      next:(data)=>this.admins=data
    })
    return this.httpClient.get<Admin[]>(`${environment.apiUrl}/administrateurs`)
  }
  public searchAdmin(nom:string){
      return this.admins.filter((admin:Admin)=>admin.prenom.toLowerCase().includes(nom.toLowerCase()))
  }
  public getGenres():Observable<Genre[]>{
    return this.httpClient.get<Genre[]>(`${environment.apiUrl}/genres`)
  }
  public findByLogin(login:string){
    return this.httpClient.get(`${environment.apiUrl}/utilisateurs/login/${login}`)
  }
  public findByTelephone(telephone:string){
    return this.httpClient.get(`${environment.apiUrl}/utilisateurs/telephone/${telephone}`)
  }

  public addAdmin(admin:Admin){
    return this.httpClient.post(`${environment.apiUrl}/administrateurs`,admin)
}
  public changeStatus(id:number){
    return this.httpClient.put(`${environment.apiUrl}/utilisateurs/status/${id}`,{})
  }
  public updateAdmin(admin:Admin){
    return this.httpClient.put(`${environment.apiUrl}/utilisateurs/${admin.id}`,admin)
  }
}
