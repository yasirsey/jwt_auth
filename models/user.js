const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: [3, 'Username cannot be shorter than 3 characters.'],
        maxlength: [11, 'Username cannot be longer than 11 characters.'],
        validate: {
            validator: function(v) {
              return /([a-zA-Z0-9_.])+/.test(v);
            },
            message: props => `Username must be alphanumeric.`
        },
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User