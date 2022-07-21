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
import {ParentModelGet} from "../../models/parent-model-get";
import {Subscription} from "rxjs";

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
  cni_exist:boolean=false
  parent!:ParentModelGet
  eleveForm!: FormGroup
  parentForm!:FormGroup
  constructor(private eleveService:ElevesService,
              private adminService:AdminsService,
              private parentService:ParentService,
              private classeService:ClassesService,
              private form:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.getGenre()
    this.getClasses()
    this.eleveForm = this.form.group({
      prenom : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      nom : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      adresse : this.form.control(null,[Validators.required,Validators.max(100),Validators.min(3)]),
      date_naissance: this.form.control(null,[Validators.required]),
      genre_id : this.form.control(null,[Validators.required]),
      classe_id : this.form.control(null,[Validators.required])
    })
    this.parentForm = this.form.group({
      prenomParent : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      nomParent : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      adresseParent : this.form.control(null,[Validators.required,Validators.max(100),Validators.min(3)]),
      telephone: this.form.control(null,[Validators.required,Validators.pattern('^(77|78|76|70|75)[0-9]{7}$')]),
      cni: this.form.control(null,[Validators.required,Validators.pattern('^(1|2)[0-9]{12}$')]),
      login : this.form.control(null,[Validators.required,Validators.max(20),Validators.min(3)]),
      genre_idParent : this.form.control(null,[Validators.required])
    })
  }
  public getGenre(){
    this.adminService.getGenres().subscribe({
      next: (data) => {this.genres=data},
      error:(error)=>console.log(error)
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
  get prenomParent(){return this.parentForm.get('prenomParent')}
  get nomParent(){return this.parentForm.get('nomParent')}
  get adresseParent(){return this.parentForm.get('adresseParent')}
  get cni(){return this.parentForm.get('cni')}
  get login(){return this.parentForm.get('login')}
  get genre_idParent(){return this.parentForm.get('genre_idParent')}

  public findByCni(){
    if (this.parentForm.value.cni.length == 13){
    this.parentService.finByCni(this.parentForm.value.cni).subscribe({
         next: (data) => {
           if (data == null) {
             this.cni_exist = false
           } else {
             this.parent = data
             this.parentForm.patchValue({
                prenomParent: this.parent.prenom,
                nomParent: this.parent.nom,
                adresseParent: this.parent.adresse,
                genre_idParent: this.parent.genre.id,
                telephone: this.parent.telephone,
                login: this.parent.login
             })
             this.cni_exist = true
           }
         },
         error: (error) => console.log(error)
       })
    }
  }
  submitForm() {
   if(this.is_update){
     //Modification d'eleve
   }else{
     const eleve:Eleve ={
       id:null,
       prenom: this.eleveForm.value.prenom,
       nom: this.eleveForm.value.nom,
       adresse: this.eleveForm.value.adresse,
       genre_id: this.eleveForm.value.genre_id,
       date_naissance: this.eleveForm.value.date_naissance,
       annee: this.eleveForm.value.classe_id,

       prenomParent: (this.parent)?this.parent.prenom:this.parentForm.value.prenomParent,
       nomParent: (this.parent)?this.parent.nom:this.parentForm.value.nomParent,
       adresseParent: (this.parent)?this.parent.adresse:this.parentForm.value.adresseParent,
       telephone: (this.parent)?this.parent.telephone:this.parentForm.value.telephone,
       cni: (this.parent)?this.parent.cni:this.parentForm.value.cni,
       login: (this.parent)?this.parent.login:this.parentForm.value.login,
       genreIdParent: (this.parent)?this.parent.genre.id:this.parentForm.value.genre_idParent,
     }
     this.eleveService.addEleve(eleve).subscribe({
        next: () => {
          this.router.navigate(['/eleves'])
        },
        error: (error) => console.log(error)
     })
   }
  }
}
