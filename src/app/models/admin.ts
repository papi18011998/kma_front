export interface Admin {
  id: any
  prenom: string
  nom: string,
  login: string
  adresse: string
  is_active: boolean
  genre : {
    id: number,
    "libelle": null
  }
  telephone: string
}
