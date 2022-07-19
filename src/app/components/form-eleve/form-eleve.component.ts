import { Component, OnInit } from '@angular/core';
import {ElevesService} from "../../services/eleves.service";
import {AdminsService} from "../../services/admins.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParentService} from "../../services/parent.service";
import {ClassesService} from "../../services/classes.service";
import {Eleve} from "../../models/eleve";
import {Router} from "@angular/router";
import {Genre} from "../../models/genre";
import {Classe} from "../../models/classe";

@Component({
  selector: 'app-form-eleve',
  templateUrl: './form-eleve.component.html',
  styleUrls: ['./form-eleve.component.css']
})
export class FormEleveComponent implements OnInit {
  genres!:Genre[]
  parents!:any
  classes!:Classe[]
  is_update:boolean=false
  eleveForm!: FormGroup;
  constructor(private eleveService:ElevesService,
              private adminService:AdminsService,
              private parentService:ParentService,
              private classeService:ClassesService,
              private form:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.getGenre()
    this.getParents()
    this.getClasses()
    this.eleveForm=this.form.group({
      prenom : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      nom : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      adresse : this.form.control(null,[Validators.required,Validators.max(100),Validators.min(3)]),
      date_naissance: this.form.control(null,[Validators.required]),
      genre_id : this.form.control(null,[Validators.required]),
      parent_id : this.form.control(null,[Validators.required]),
      classe_id : this.form.control(null,[Validators.required])
    })
  }
  public getGenre(){
    this.adminService.getGenres().subscribe({
      next: (data) => {this.genres=data},
      error:(error)=>console.log(error)
    })
  }

  public getParents(){
    this.parentService.getParents().subscribe({
      next:(data)=>this.parents=data
    })
  }

  private getClasses() {
    this.classeService.getClasses().subscribe({
      next: (data) => {this.classes=data},
      error:(error)=>console.log(error)
    })
  }
  get prenom(){return this.eleveForm.get('prenom')}
  get nom(){return this.eleveForm.get('nom')}
  get adresse(){return this.eleveForm.get('adresse')}
  get telephone(){return this.eleveForm.get('telephone')}
  get date_naissance(){return this.eleveForm.get('date_naissance')}

  submitForm() {
    if(this.is_update){
      //Modification d'eleve
    }else {
      //Ajout d'eleve
      const eleve:Eleve = {
        id:null,
        prenom:this.eleveForm.value.prenom,
        nom: this.eleveForm.value.nom,
        adresse: this.eleveForm.value.adresse,
        genreId: this.eleveForm.value.genre_id,
        parentId: this.eleveForm.value.parent_id,
        date_naissance: this.eleveForm.value.date_naissance,
        annee: this.eleveForm.value.classe_id
      }
      // console.log(typeof eleve.annees)
      this.eleveService.addEleve(eleve).subscribe({
        next:()=>this.router.navigate(['eleves']),
        error:(error)=>console.log(error)
      })
    }
  }
}
