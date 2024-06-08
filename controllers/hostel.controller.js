const Hostel = require('../models/hostel.model');


exports.setHostel = (req, res) => {
    const hostel = new Hostel({
        name: req.body.name,
        status: req.body.status
    })
    
    hostel.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new hostel created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "error", result: err, })
    })

}


exports.getHostel = (req, res) => {
    
    Hostel.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"hostel not found"});
        }
    });   

}



exports.getAllHostels = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Hostel.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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


exports.editHostel = (req, res) => {
    const details = {
        name: req.body.name,
        status: req.body.status
    }

   Hostel.findByIdAndUpdate({_id: req.body.id}, details, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"", result:"Hostel not found"});
        }
   });

}

exports.removeHostel = (req, res) => {
    Hostel.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Hostel removed successfully"});
         }else{
            return res.json({error:"error", result:"Hostel not found"});
         }
    });
 
 }
 



