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

userSchema.pre('save', function(next) {
    let user = this

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(6, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)
            
            user.password = hash
            next()
        })
    })
})
     
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User