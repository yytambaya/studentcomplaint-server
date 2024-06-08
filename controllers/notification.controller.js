const Notification = require('../models/notification.model');


exports.setNotification = (req, res) => {
    const notification = new Notification({
        message: req.body.message,
        type: req.body.type,
        hostelId: req.body.hostelId,
        status: req.body.status
    })
    
    notification.save()
    .then( result => {
        //console.log("USER ID: " + result._id);
        return res.json({error: "", result: "A new notification created successfully", })
    })
    .catch(err => {
        console.log("Error: ", err);
        res.json({error: "error", result: err, })
    })

}


exports.getNotification = (req, res) => {
    
    Notification.findOne({_id: req.query.id}, (err, result) => {
        if(err){
            console.log("Error: ", err);
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            return res.json({error:"", result: result});
        }else{
            return res.json({error:"error", result:"notification not found"});
        }
    });   

}



exports.getAllNotifications = async (req, res) => {
    console.log("Getting more")   
    var returnValue = {}
    try{
       await Notification.find({}).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({createdAt: -1}).then(async result => {
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


exports.editNotification = (req, res) => {
    const notification = new Notification({
        message: req.body.message,
        type: req.body.type,
        hostelId: req.body.hostelId,
        status: req.body.status
    })

   Notification.findByIdAndUpdate({_id: req.body.id}, notification, (err, result) => {
        if(err){
            return res.json({error:"error", result:"something went wrong"});
        }
        if(result){
            console.log(result);
            return res.json({error:"", result:result});
        }else{
            return res.json({error:"", result:"Notification not found"});
        }
   });

}

exports.removeNotification = (req, res) => {
    Notification.findByIdAndDelete(req.body.id, (err, result) => {
         if(err){
             return res.json({error:"error", result:"something went wrong"});
         }
         if(result){
             //console.log(result);
             return res.json({error:"", result:"Notification removed successfully"});
         }else{
            return res.json({error:"error", result:"Notification not found"});
         }
    });
 
 }
 



