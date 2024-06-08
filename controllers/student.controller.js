const Student = require('../models/student.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require('../config');

exports.studentLogin = (req, res) => {    
    Student.findOne({regNumber: req.body.regNumber}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", status: 500, result:"something went wrong"});
        }
        if(result){
            const isValidPassword = bcrypt.compareSync(req.body.password, result.password);
            if(!isValidPassword){
               return res.json({error:"error", status: 404, result:"reg number or password is incorrect"});
            }
            if(false){
                return res.json({error:"error", result:"Verify your account"});
            }else{
                console.log("My User ID: " + result._id)
                console.log(result);
                const token = jwt.sign({email: req.body.regNumber}, config.allconfig.temp_var.token_secret, {expiresIn: '86400s'}); 
                return res.json({error:"", code:400, status:200, result:{token: token, result}});
            }   
        }else{
            return res.json({error:"error", status: 404, result:"reg number or password is incorrect"});
        }
     
    });
};    


exports.setStudent = (req, res) => {
    const student = new Student({
        name: req.body.name,
        regNumber: req.body.regNumber,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        hostelId: req.body.hostelId,
        password: bcrypt.hashSync(req.body.password, 8),
        status: req.body.status
    })
    
    student.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new student created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "error", result: err, })
    })

}


exports.getStudent = (req, res) => {
    
    Student.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"student not found"});
        }
    });   

}



exports.getAllStudents = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Student.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
           if(Object.keys(result).length != 0){
                returnValue = {error:"", result:result}
           
           }else{
               returnValue = {error:"error", result:"NO_LITS"};
           }

       }).catch(error => {
           //console.log("Error: " + error)
           returnValue = {error: "error", result:"Something went wrong"}
       })   
       //console.log("Tweets with profiles...")
       return res.json(returnValue);

   }catch(error){
       //console.log(error)
       return res.json({error:"error", result:"Something went wrong"});
       
   }

}


exports.editStudent = (req, res) => {

    const student = new Student({
        name: req.body.name,
        regNumber: req.body.regNumber,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        hostelId: req.body.hostelId,
        password: bcrypt.hashSync(req.body.password, 8),
        status: req.body.status
    })

   Student.findByIdAndUpdate({_id: req.body.id}, student, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){

            console.log("Data updated")
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"error", result:"Student not found"});
        }
   })

}

exports.removeStudent = (req, res) => {
    Student.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Student removed successfully"});
         }else{
            return res.json({error:"error", result:"Student not found"});
         }
    });
 
 }
 



