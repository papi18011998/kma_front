import { Component, OnInit } from '@angular/core';
import {ProfesseursService} from "../../services/professeurs.service";

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.component.html',
  styleUrls: ['./professeurs.component.css']
})
export class ProfesseursComponent implements OnInit {

  constructor(private professeurService:ProfesseursService) { }
  professeurs:any
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
}
