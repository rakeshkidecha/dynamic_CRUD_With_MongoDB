const mongoose =require('mongoose');
const EmplloyeeSchema = mongoose.Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    hobby:{
        type:Array,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
})

const Emplloyee = mongoose.model('Emplloyee',EmplloyeeSchema);

module.exports = Emplloyee;