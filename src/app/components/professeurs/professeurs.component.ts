import { Component, OnInit } from '@angular/core';
import {ProfesseursService} from "../../services/professeurs.service";
import {AdminsService} from "../../services/admins.service";
import {Router} from "@angular/router";
import {Professeur} from "../../models/professeur";

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  styleUrls: ['./professeurs.component.css']
})
export class ProfesseursComponent implements OnInit {

  constructor(private professeurService:ProfesseursService,private adminsService:AdminsService,private router:Router) { }
  professeurs!:any
  page:number =1
  ngOnInit(): void {
    this.getProfesseurs()
  }
  getProfesseurs(){
    this.professeurService.getProfesseurs().subscribe({
      next:(data)=>{
        this.professeurs=data
      }
    })
  }

  changeStatus(id:number) {
    let response = confirm("Voulez-vous vraiment changer le status de cet utilisateur ?")
    if (response){
      this.adminsService.changeStatus(id).subscribe({
        next:(data)=>{this.getProfesseurs()},
        error:(error)=>{console.log(error)}
      })
    }
  }

  goTo(id:number) {
    let founded = this.professeurs.find((professeur:any)=>professeur.id==id)
    localStorage.setItem('professeur',JSON.stringify(founded).toString())
    this.router.navigate(['professeurs',id])
  }
}
