import { Component, OnInit } from '@angular/core';
import {ElevesService} from "../../services/eleves.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EleveModelGet} from "../../models/eleve-model-get";

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.css']
})
export class ElevesComponent implements OnInit {
  eleves!:EleveModelGet[]
  searchForm!:FormGroup
  page:number = 1
  constructor(private eleveService:ElevesService,private form:FormBuilder) { }

  ngOnInit(): void {
    this.getEleves()
    this.searchForm = this.form.group({
      nom:this.form.control(null)
    })
  }
 public getEleves(){
    this.eleveService.getEleves().subscribe({
     next:(data)=>this.eleves=data,
     error:(err)=>console.log(err)
    })
 }

  search() {

  }
}
