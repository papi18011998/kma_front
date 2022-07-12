export interface Professeur {
  professeurDTO: {
    id: null,
    prenom: string,
    nom: string,
    login: string,
    adresse: string,
    is_active: boolean,
    genre: {
      id: number,
      libelle:null
    },
    telephone: string,
    date_prise_fonction: Date,
    matiere: {
      id: number,
      libelle: null,
      coefficient: null
    }
  },
  classes: []
}
