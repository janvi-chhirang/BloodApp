const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['admin', 'organisation', 'hospital', 'donar'],
        required: true,
    },
    name: {
        type: String,
        required: function () {
            if (this.role === 'admin' || this.role === 'user') {
                return true;
            }
            return false;
        }
    },
    organisationName: {
        type: String,
        required: function () {
            if (this.role === 'organisation') {
                return true;
            }
            return false;
        } 
    }, 
    hospitalName: {
        type: String,
        required: function () {
            if (this.role === 'hospital') {
                return true;
            }
            return false;
        } 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    }
},{ timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;