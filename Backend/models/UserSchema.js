const mongoose = require('mongoose')

const AuthSchema =  new mongoose.Schema({
    nom: String,
    prenom: String,
    email : {type: String, required:true, unique: true},
    password: {type:String, required: true},
    Matricule: { type: Number },
    dateDeNaissance: Date,
    poste: String,
    sexe: String,
    situation: String,
    solde: Number,
    telephone: Number,
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})

module.exports = mongoose.model("AuthSchema", AuthSchema)