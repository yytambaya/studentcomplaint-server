const controllers = require('../controllers');
const middlewares = require("../middlewares");
const express = require("express");
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
//const { setLit } = require('../controllers/lit/Lit');
const { setPark, getPark, getAllParks, editPark, removePark } = require('../controllers/park.controller');
const { getAllSlots, setSlot, editSlot, removeSlot, getSlot } = require('../controllers/slot.controller');
const { getAllReservations, setReservation, getReservation, editReservation, removeReservation, getAllUserReservations, revokeReservation } = require('../controllers/reservation.controller');
const { getAllUsers, editUser, removeUser, getUser, setUser } = require('../controllers/user.controller');
const { setStudent, getStudent, editStudent, removeStudent, getAllStudents, studentLogin } = require('../controllers/student.controller');
const { setHostel, getHostel, getAllHostels, editHostel, removeHostel } = require('../controllers/hostel.controller');
const { setComplaint, getComplaint, getAllComplaints, editComplaint, removeComplaint, markComplaintAsResolved, replyToComplaint, getSingleUserComplaints } = require('../controllers/complaint.controller');
const { setNotification, getNotification, getAllNotifications, editNotification, removeNotification } = require('../controllers/notification.controller');
//const { userValidationRules, validate } = require('../middlewares')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, + Date.now())
     console.log("uploaded")
  }
});

var upload = multer({ storage: storage });


module.exports = app => {
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const router = require("express").Router();
    app.use(controllers, router);
    app.use(cors());
    app.use(passport.initialize())
    app.use(passport.session())
    
    //Starter
    //app.post('/v1/user/signup', [middlewares.validatorV2.signup,  middlewares.Auth.accountExists], controllers.login.signUp);
    //app.post('/v1/user/subscribe', [ middlewares.validatorV2.validateEmail,  middlewares.Auth.subscriptionExists], controllers.login.subscribe);
    //app.post('/v1/admin/signup', [ middlewares.validatorV2.signup,  middlewares.Auth.adminAccountExists], controllers.login.adminSignUp);
    //app.get('/v1/user/activate', [middlewares.validator.validateID_get],  controllers.login.verifyAccount); //correct 
    //app.post('/v1/user/login', [ middlewares.validatorV2.login, middlewares.Dashbaord.accountVerified], controllers.login.signIn);
    //app.post('/v1/admin/login', [ middlewares.validatorV2.login], controllers.login.adminSignIn);
    //app.post('/v1/user/forgotpassword', [ middlewares.validatorV2.validateEmail], controllers.login.forgotPassword);
    //app.get('/v1/user/reset', [middlewares.validator.validateID_get, middlewares.validator.validateToken], controllers.login.passwordReset);
    //app.post('/v1/user/newpassword', [ middlewares.validator.validateID_post, middlewares.validatorV2.validatePassword], controllers.login.newPassword);
    //app.post('/v1/user/pay', [ middlewares.Auth.isLogged, middlewares.validator.validateEmail,middlewares.validatorV2.validateID, middlewares.validator.validatePaymentType], controllers.login.pay);
    //app.get('/v1/user/subscription', [ middlewares.validator.validateID_get, middlewares.Auth.isPaid, middlewares.Auth.isLogged, middlewares.validator.validateID_get], controllers.login.getSubscription);
    //app.post('/v1/user/reactivate', [ middlewares.validatorV2.validateEmail], controllers.login.reactivate);
    /*app.get('/v1/logout', [ middlewares.Auth.isLogged, middlewares.validator.validateID_get, middlewares.Auth.isPaid], controllers.login.logout);*/
    //app.get('/v1/dashboard', [middlewares.Auth.isLogged], controllers.dashboard.getHomepage);
    
    //Login with Google
    //app.get('/v1/google/login', passport.authenticate('google', { scope: ['profile','email'] }))
    //app.get('/v1/google/login/callback', passport.authenticate('google', { failureRedirect: '/google/login/failure' }), controllers.login.signUpWithGoogle)
    //app.get('/v1/logout', (req, res) => {req.logout(); res.redirect('/')})
    //app.get('/v1/success', controllers.login.signUpWithGoogle)
    //app.get('/v1/google/login/failure', (req, res) => {req.logout(); res.json({error: "error", result:"Something went wrong!"})})

    //Lits
    //app.get('/v1/lit/get', [middlewares.Auth.isAuthorized], controllers.lit.Lit.getLit);
    //app.get('/v1/lit/getall', [middlewares.Auth.isAuthorized], controllers.lit.Lit.getAllLits);
    
    //Admin Lits
    //app.post('/v1/admin/lit/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.lit, middlewares.Dashbaord.litExists], controllers.lit.Lit.setLit);
    //app.get('/v1/admin/lit/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], controllers.lit.Lit.getLit);
    //app.get('/v1/admin/lit/getall', [ middlewares.Auth.isLogged], controllers.lit.Lit.getAllLits);
    //app.post('/v1/admin/lit/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.lit, middlewares.validatorV2.validateID], controllers.lit.Lit.editLit);
    //app.post('/v1/admin/lit/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], controllers.lit.Lit.removeLit);
    
    //Admin
    app.post('/v1/admin/signup', [ middlewares.validatorV2.signup,  middlewares.Auth.adminAccountExists], controllers.login.adminSignUp);
    app.post('/v1/admin/login', [middlewares.validatorV2.login], controllers.login.adminSignIn);
    
    
    // Student - admin
    app.post('/v1/admin/student/new', [middlewares.validatorV2.student, middlewares.Dashbaord.emailExists, middlewares.Dashbaord.phoneNumberExists, middlewares.Dashbaord.regNumberExists], setStudent);
    app.get('/v1/admin/student/get', [middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getStudent);
    app.get('/v1/admin/student/getall', [ middlewares.Auth.isLogged], getAllStudents);
    app.post('/v1/admin/student/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.student, middlewares.validatorV2.validateID, middlewares.Dashbaord.emailEditExists, middlewares.Dashbaord.phoneNumberEditExists, middlewares.Dashbaord.regNumberEditExists], editStudent);
    app.post('/v1/admin/student/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], removeStudent);

    // Student
    app.post('/v1/student/login', [middlewares.validatorV2.studentLogin, middlewares.Dashbaord.accountVerified], studentLogin);
    app.post('/v1/student/new', [ middlewares.validatorV2.student, middlewares.Dashbaord.emailExists, middlewares.Dashbaord.phoneNumberExists, middlewares.Dashbaord.regNumberExists], setStudent);
    app.get('/v1/student/get', [ middlewares.validatorV2.validateIDGet], getStudent);
    app.post('/v1/student/edit', [ middlewares.validatorV2.student, middlewares.validatorV2.validateID, middlewares.Dashbaord.emailEditExists, middlewares.Dashbaord.phoneNumberEditExists, middlewares.Dashbaord.regNumberEditExists], editStudent);
    app.post('/v1/student/remove', [ middlewares.validatorV2.validateID], removeStudent);
  
    // Hostel
    app.post('/v1/admin/hostel/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.hostel, middlewares.Dashbaord.hostelExists], setHostel);
    app.get('/v1/hostel/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getHostel);
    app.get('/v1/admin/hostel/getall', getAllHostels);
    app.post('/v1/admin/hostel/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.hostel, middlewares.validatorV2.validateID, middlewares.Dashbaord.hostelEditExists], editHostel);
    app.post('/v1/admin/hostel/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], removeHostel);
  
    // Complaint
    app.post('/v1/admin/complaint/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.complaint], setComplaint);
    app.get('/v1/complaint/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getComplaint);
    app.get('/v1/admin/complaint/getall', [ middlewares.Auth.isLogged], getAllComplaints);
    app.get('/v1/admin/complaint/getforuser', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getSingleUserComplaints);
    app.post('/v1/admin/complaint/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.complaint, middlewares.validatorV2.validateID], editComplaint);
    app.post('/v1/admin/complaint/reply', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID, middlewares.validatorV2.reply], replyToComplaint);
    app.post('/v1/admin/complaint/tracking-status', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], markComplaintAsResolved);
    app.post('/v1/admin/complaint/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], removeComplaint);
  
    // Notification
    app.post('/v1/admin/notification/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.notification], setNotification);
    app.get('/v1/notification/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getNotification);
    app.get('/v1/admin/notification/getall', [ middlewares.Auth.isLogged], getAllNotifications);
    app.post('/v1/admin/notification/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.notification, middlewares.validatorV2.validateID], editNotification);
    app.post('/v1/admin/notification/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], removeNotification);
  
    
    
    //Admin Student
    //app.post('/v1/admin/user/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.user, middlewares.Dashbaord.emailExists,middlewares.Dashbaord.phoneNumberExists], setUser);
    //app.get('/v1/admin/user/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getUser);
    //app.get('/v1/admin/user/getall', [ middlewares.Auth.isLogged], getAllUsers);
    //app.post('/v1/admin/user/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.user, middlewares.validatorV2.validateID, middlewares.Dashbaord.emailEditExists, middlewares.Dashbaord.phoneNumberEditExists], editUser);
    //app.post('/v1/admin/user/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], removeUser);
    
    //User
    //app.post('/v1/user/new', [ middlewares.validatorV2.user, middlewares.Dashbaord.emailExists,middlewares.Dashbaord.phoneNumberExists], setUser);
    //app.get('/v1/user/get', [ middlewares.validatorV2.validateIDGet], getUser);
    //app.post('/v1/user/edit', [ middlewares.validatorV2.user, middlewares.validatorV2.validateID, middlewares.Dashbaord.emailEditExists, middlewares.Dashbaord.phoneNumberEditExists], editUser);
    //app.post('/v1/user/remove', [ middlewares.validatorV2.validateID], removeUser);
  
  //Admin Park
  //app.post('/v1/admin/park/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.park, middlewares.Dashbaord.parkNameExists], setPark);
  //app.get('/v1/park/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getPark);
  //app.get('/v1/admin/park/getall', [ middlewares.Auth.isLogged], getAllParks);
  //app.post('/v1/admin/park/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.park, middlewares.validatorV2.validateID, middlewares.Dashbaord.parkNameEditExists], editPark);
  //app.post('/v1/admin/park/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], removePark);
  
  //Admin slot
  //app.post('/v1/admin/slot/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.slot, middlewares.Dashbaord.parkSlotExists], setSlot);
  //app.get('/v1/admin/slot/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getSlot);
  //app.get('/v1/admin/slot/getall', [ middlewares.Auth.isLogged], getAllSlots);
  //app.post('/v1/admin/slot/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.slot, middlewares.validatorV2.validateID, middlewares.Dashbaord.parkSlotEditExists], editSlot);
  //app.post('/v1/admin/slot/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], removeSlot);
  
  //Reservation
  //app.post('/v1/reservation/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.reservation], setReservation);
  //app.get('/v1/reservation/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getReservation);
  //app.get('/v1/admin/reservation/getall', [ middlewares.Auth.isLogged], getAllReservations);
  //app.get('/v1/reservation/user-getall', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateIDGet], getAllUserReservations);
  //app.post('/v1/admin/reservation/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.slot, middlewares.validatorV2.validateID], editReservation);
  //app.post('/v1/admin/reservation/revoke', [ middlewares.Auth.isLogged, middlewares.validatorV2.revoking], revokeReservation);
  //app.post('/v1/admin/reservation/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], removeReservation);
  


    //user
    //app.get('/v1/getuser', [ middlewares.Auth.isLogged, middlewares.validator.validateID_get, middlewares.Auth.isPaid], controllers.dashboard.getUser);
    

    //Collection
    

    
    //Admin 
   
    //->Profile 
    //app.post('/v1/admin/profile/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.signup, middlewares.Auth.accountExists], controllers.login.signUp);
    //app.get('/v1/admin/profile/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], controllers.dashboard.Profile.getAdmin);
    //app.get('/v1/admin/profile/getall', [ middlewares.Auth.isLogged], controllers.dashboard.Profile.getAllUsers);
    //app.post('/v1/admin/profile/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.profile, middlewares.validatorV2.validateUserID], controllers.dashboard.Profile.editUser);
    //app.post('/v1/admin/profile/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateUserID], controllers.dashboard.Profile.removeProfile);
    
    //Tickets
    //app.get('/v1/admin/stats/ticket/getll', [ middlewares.Auth.isLogged], controllers.dashboard.Payment.getAllStatsTickets);
    //app.get('/v1/admin/stats/ticket/get', [ middlewares.Auth.isLogged], controllers.dashboard.Payment.getStatsTickets);
    
    
    //->Program 
    //app.post('/v1/admin/program/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.program, middlewares.validatorV2.validateID, middlewares.Dashbaord.programExists, upload.single("logo")], controllers.dashboard.Program.setProgram);
    //app.get('/v1/admin/program/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], controllers.dashboard.Program.getProgram);
    //app.get('/v1/admin/program/getall', [ middlewares.Auth.isLogged], controllers.dashboard.Program.getAllPrograms);
    //app.get('/v1/admin/program/getallbytype', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateStatusType, middlewares.validatorV2.validateRaffleDrawType], controllers.dashboard.Program.getAllProgramsByType);
    //app.get('/v1/admin/program/getoffers', [ middlewares.Auth.isLogged], controllers.dashboard.Program.getAllPrograms);
    //app.get('/v1/admin/program/getmyprograms', [ middlewares.Auth.isLogged], controllers.dashboard.Program.getAllPrograms);
    //app.post('/v1/admin/program/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.program, middlewares.validatorV2.validateID, middlewares.validatorV2.validateProgramID, middlewares.Dashbaord.programExists, upload.single("logo")], controllers.dashboard.Program.editProgram);
    //app.post('/v1/admin/program/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], controllers.dashboard.Program.removeProgram);
    
    //->Leadboard
    //app.post('/v1/admin/leadboard/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.leadboard, middlewares.validatorV2.validateID, middlewares.Dashbaord.leadExists], controllers.dashboard.Leadboard.setLead);
    //app.get('/v1/admin/leadboard/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], controllers.dashboard.Leadboard.getLead);
    //app.get('/v1/admin/leadboard/getall', [ middlewares.Auth.isLogged], controllers.dashboard.Leadboard.getAllLeads);
    //app.post('/v1/admin/leadboard/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.leadboard, middlewares.validatorV2.validateID], controllers.dashboard.Leadboard.editLead);
    //app.get('/v1/admin/leadboard/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], controllers.dashboard.Leadboard.removeLead);
    
     //->Payment 
     //app.post('/v1/admin/payment/new', [ middlewares.Auth.isLogged, middlewares.validatorV2.payment, middlewares.Dashbaord.paymentExists], controllers.dashboard.Payment.pay);
     //app.get('/v1/verifypayment', [middlewares.validatorV2.validateTransactionID], controllers.dashboard.Payment.verifyPayment);
     //app.get('/v1/admin/payment/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateRaffleDrawType, middlewares.validatorV2.validateDateType], controllers.dashboard.Payment.getPaymentByDate);
     //app.get('/v1/admin/payment/getall', [ middlewares.Auth.isLogged], controllers.dashboard.Payment.getAllPayments);
     
     //Ticket
     //app.get('/v1/admin/ticket/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateRaffleDrawType, middlewares.validatorV2.validateDate], controllers.dashboard.Payment.getPaymentByDate);
     //app.get('/v1/admin/ticket/getall', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateUserIDGet], controllers.dashboard.Payment.getAllTickets);
     
     //Winners
     //app.post('/v1/admin/winner/set', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateTicketIDPost], controllers.dashboard.Winner.setWinner);
     
     //Support
     //app.post('/v1/user/support/feedback', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateUserIDPost, middlewares.validator.validateEmail, middlewares.validatorV2.validateTitle, middlewares.validatorV2.validateDescription], controllers.dashboard.Support.setFeedback);
    

    //->Referral
    //app.get('/v1/admin/referral/get', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], controllers.dashboard.Leadboard.getLead);
    // app.get('/v1/admin/referral/getall', [ middlewares.Auth.isLogged], controllers.dashboard.Leadboard.getAllLeads);
    //app.post('/v1/admin/referral/edit', [ middlewares.Auth.isLogged, middlewares.validatorV2.leadboard, middlewares.validatorV2.validateID], controllers.dashboard.Leadboard.editLead);
    //app.get('/v1/admin/leadboard/remove', [ middlewares.Auth.isLogged, middlewares.validatorV2.validateID], controllers.dashboard.Leadboard.removeLead);
        

}