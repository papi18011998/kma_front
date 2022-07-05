import { Component, OnInit } from '@angular/core';
import {AdminsService} from "../../services/admins.service";
import {Admin} from "../../models/admin";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css','../../../styles.css']
})
export class AdminsComponent implements OnInit {
  admins!:any
  page: number = 1;
  searchForm!:FormGroup
  requiredField!:string
  constructor(private adminsService:AdminsService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      nom: this.formBuilder.control(null)
    })
    this.getAdmins()
  }
  public getAdmins(){
    this.adminsService.getAdmins().subscribe({
      next:(data)=>{this.admins=data},
      error:(error)=>{console.log(error)}
    })
  }

  search() {
    if (this.searchForm.value.nom == null)
      return
    this.admins = this.adminsService.searchAdmin(this.searchForm.value.nom.toLowerCase())
  }

  changeStatus(id:number) {
    let response = confirm("Voulez-vous vraiment changer le status de cet utilisateur ?")
    if (response){
      this.adminsService.changeStatus(id).subscribe({
        next:(data)=>{this.getAdmins()},
        error:(error)=>{console.log(error)}
      })
    }
  }
}
