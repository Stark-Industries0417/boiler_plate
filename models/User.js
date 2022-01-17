const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = {User}