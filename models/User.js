const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,         // 스페이스(공백 ) 없애주는 옵션
    },
    password: {
        type: String,
        minlength: 8
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {                    // 유효성 검증
        type: String
    },
    tokenExp: {                 // 토큰 유효성 유효기간
        type: Number
    }
});
userSchema.pre('save', function(next) {
    var user = this
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
    
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this
    var token = jwt.sign(this._id.toHexString(), 'secretToken');
    this.token = token;
    this.save((err, user) => {
        if(err) return cb(err);
        cb(null, user);
    });
}


const User = mongoose.model('User', userSchema);

module.exports = {User}