const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    firstname: {
        type: String
       
    },
    lastname: {
        type: String
       
    },
   
 
    email: {
        type: String,
       
    },
   
    phone: {
        type: String,
     
    },
    password: {
        type: String,
       
    },
   
      
    date: {
        type: Date,
        default: Date.now
    }
   
})

module.exports = mongoose.model('UserAccounts', UsersSchema)