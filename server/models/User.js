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

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저 찾은 후
        // 클라이언트에서 가져온 token 과 DB에 보관된 토큰 일치하는지 확인 
        user.findOne({"_id": decoded, "token": token}, function (err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
    });
}

const User = mongoose.model('User', userSchema);

module.exports = {User}