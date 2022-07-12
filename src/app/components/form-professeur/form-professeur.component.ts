import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfesseursService} from "../../services/professeurs.service";
import {ClassesService} from "../../services/classes.service";
import {AdminsService} from "../../services/admins.service";
import {Router} from "@angular/router";
import {Professeur} from "../../models/professeur";

@Component({
  selector: 'app-form-professeur',
  templateUrl: './form-professeur.component.html',
  styleUrls: ['./form-professeur.component.css']
})
export class FormProfesseurComponent implements OnInit {
  addProfesseurForm!:FormGroup
  matieres!:any
  classes!:any
  classesEnseignees!:[]
  existingLogin:boolean = false
  existingTelephone:boolean = false
  genres:any;
  constructor(private formBuilder:FormBuilder,
              private professeurService:ProfesseursService,
              private classeService:ClassesService,
              private adminService:AdminsService,
              private route:Router) { }

  ngOnInit(): void {
  this.getMatieres()
  this.getClasses()
  this.getGenres()
  this.addProfesseurForm = this.formBuilder.group({
      prenom: this.formBuilder.control(null, Validators.required),
      nom: this.formBuilder.control(null, Validators.required),
      login: this.formBuilder.control(null, Validators.required),
      adresse: this.formBuilder.control(null, Validators.required),
      telephone: this.formBuilder.control(null, [Validators.pattern('^(77|78|76|70|75)[0-9]{7}$'), Validators.required]),
      genre_id: this.formBuilder.control(null),
      matiere_id: this.formBuilder.control(null),
      date_prise_fonction: this.formBuilder.control(null,[Validators.required]),
      classes: new FormArray([])
    })
  }
  public getMatieres(){
   this.professeurService.getMateires().subscribe({
      next: (data) => {this.matieres=data}
   })
  }
  public getClasses(){
    this.classeService.getClasses().subscribe({
      next: (data) => {this.classes=data},
      error: (err) => {console.log(err)}
    })
  }

  public getGenres(){
    this.adminService.getGenres().subscribe({
      next:(data)=>{
        this.genres=data
      },
      error:(error)=> console.log(error)
    })
  }

  onCheckClass(event:any) {
    const checkedClasses = this.addProfesseurForm.controls['classes'] as FormArray;
    if (event.target.checked){
      checkedClasses.push(new FormControl(event.target.value))
    }else{
      const index = checkedClasses.controls.findIndex(x=> x.value===event.target.value)
      checkedClasses.removeAt(index)
    }
    this.classesEnseignees = checkedClasses.value
  }
  async submitProfesseur() {
      const professeur:Professeur ={
        professeurDTO: {
          id: null,
          prenom: this.addProfesseurForm.value.prenom,
          nom: this.addProfesseurForm.value.nom,
          login: this.addProfesseurForm.value.login,
          adresse: this.addProfesseurForm.value.adresse,
          is_active: true,
          genre: {
            id: this.addProfesseurForm.value.genre_id,
            libelle:null
          },
          telephone: this.addProfesseurForm.value.telephone,
          date_prise_fonction: this.addProfesseurForm.value.date_prise_fonction,
          matiere: {
            id: this.addProfesseurForm.value.matiere_id,
            libelle: null,
            coefficient: null
          }
        },
        classes: this.classesEnseignees
      }
      await this.adminService.findByLogin(this.addProfesseurForm.value.login.toLowerCase()).subscribe({
        next:(data)=>{(data!=null)?this.existingLogin=true:this.existingLogin=false}
      })

    this.adminService.findByTelephone(this.addProfesseurForm.value.telephone.toLowerCase()).subscribe({
      next: (data) => {
        (data != null) ? this.existingLogin = true : this.existingLogin = false;
        if (!this.existingLogin && !this.existingTelephone) {
          this.professeurService.addProfesseur(professeur).subscribe({
            next: () => this.route.navigate(['professeurs']),
          });
        }
      }
    })
  }

  get prenom(){return this.addProfesseurForm.get('prenom')}
  get nom(){return this.addProfesseurForm.get('nom')}
  get login(){return this.addProfesseurForm.get('login')}
  get adresse(){return this.addProfesseurForm.get('adresse')}
  get telephone(){return this.addProfesseurForm.get('telephone')}
  get date_prise_fonction(){return this.addProfesseurForm.get('date_prise_fonction')}
}
