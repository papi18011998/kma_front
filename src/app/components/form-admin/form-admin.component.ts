import { Component, OnInit } from '@angular/core';
import {AdminsService} from "../../services/admins.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Admin} from "../../models/admin";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.css']
})
export class FormAdminComponent implements OnInit {

  constructor(private adminService:AdminsService, private fromBuilder:FormBuilder, private router:Router) { }
  genres!:any
  addAdminForm!:FormGroup
  telephonePattern:string = '^(77|78|76|70|75)[0-9]{7}$'
  ngOnInit(): void {
    this.getGenres()
    this.addAdminForm = this.fromBuilder.group({
      prenom : this.fromBuilder.control(null,Validators.required),
      nom : this.fromBuilder.control(null,Validators.required),
      login : this.fromBuilder.control(null,Validators.required),
      adresse : this.fromBuilder.control(null,Validators.required),
      telephone : this.fromBuilder.control(null,[Validators.pattern(this.telephonePattern), Validators.required]),
      genre_id : this.fromBuilder.control(null)
    })
  }
  public getGenres(){
    this.adminService.getGenres().subscribe({
      next:(data)=>{
        console.log(data)
        this.genres=data
      },
      error:(error)=> console.log(error)
    })
  }

  addAdmin() {
    // alert(this.addAdminForm.value.genre_id)
      const admin:Admin = {
        id:null,
        prenom : this.addAdminForm.value.prenom,
        nom : this.addAdminForm.value.nom,
        login : this.addAdminForm.value.login,
        adresse : this.addAdminForm.value.adresse,
        telephone : this.addAdminForm.value.telephone,
        is_active : true,
        genre:{
          id:this.addAdminForm.value.genre_id,
          libelle:null
        }
      }
      this.adminService.addAdmin(admin).subscribe({
        next:()=>this.router.navigate(['admins']),
        error:(err)=>console.log(err)
      })
  }
  get prenom(){return this.addAdminForm.get('prenom')}
  get nom(){return this.addAdminForm.get('nom')}
  get login(){return this.addAdminForm.get('login')}
  get adresse(){return this.addAdminForm.get('adresse')}
  get telephone(){return this.addAdminForm.get('telephone')}
}
