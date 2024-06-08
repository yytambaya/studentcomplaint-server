const Complaint = require('../models/complaint.model');
const bcrypt = require("bcrypt");

exports.setComplaint = (req, res) => {
    const complaint = new Complaint({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        urgency: req.body.urgency,
        photos: req.body.photos,
        hostelId: req.body.hostelId,
        studentId: req.body.studentId
    })
    
    complaint.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new complaint created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "error", result: err, })
    })

}


exports.getComplaint = (req, res) => {
    
    Complaint.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"complaint not found"});
        }
    });   

}



exports.getAllComplaints = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Complaint.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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


exports.editComplaint = (req, res) => {

    const complaint = new Complaint({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        urgency: req.body.urgency,
        photos: req.body.photos,
        hostelId: req.body.hostelId,
        studentId: req.body.studentId,
        trackingStatus: req.body.trackingStatus,
        reply: req.body.reply,
        status: req.body.status
    })

   Complaint.findByIdAndUpdate({_id: req.body.id}, complaint, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){

            console.log("Data updated")
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"error", result:"Complaint not found"});
        }
   })

}

exports.replyToComplaint = (req, res) => {

    Complaint.findByIdAndUpdate({_id: req.body.id}, {reply: req.body.reply}, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
 
             console.log("Data updated")
             console.log(result);
             return res.json({error:"", result:result});
         }else{
             return res.json({error:"error", result:"Complaint not found"});
         }
    })
 
 }
 

exports.markComplaintAsResolved = (req, res) => {

   Complaint.findByIdAndUpdate({_id: req.body.id}, {trackingStatus: "resolved"}, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){

            console.log("Data updated")
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"error", result:"Complaint not found"});
        }
   })

}

exports.removeComplaint = (req, res) => {
    Complaint.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Complaint removed successfully"});
         }else{
            return res.json({error:"error", result:"Complaint not found"});
         }
    });
 
 }
 



