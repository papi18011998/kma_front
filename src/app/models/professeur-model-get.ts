import {Matiere} from "./matiere";
import {Genre} from "./genre";

export interface ProfesseurModelGet {
  id:number
  prenom:string
  nom:string
  login:string
  adresse	:string
  is_active	:string
  genre:Genre
  telephone:string
  date_prise_fonction:Date
  matiere:Matiere
}
