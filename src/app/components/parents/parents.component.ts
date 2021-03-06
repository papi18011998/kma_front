import { Component, OnInit } from '@angular/core';
import {ParentService} from "../../services/parent.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ParentModelGet} from "../../models/parent-model-get";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {
  parents!: ParentModelGet[]
  page:number = 1;
  searchForm!:FormGroup
  constructor( private parentService:ParentService, private form:FormBuilder) { }

  ngOnInit(): void {
    this.getParents()
    this.searchForm = this.form.group({
      nom:this.form.control(null)
    })
  }
 public getParents(){
    this.parentService.getParents().subscribe({
      next:(data)=>{this.parents=data}
    })
 }

  search() {
    if (this.searchForm.value.nom == null)
      return
  }
}
