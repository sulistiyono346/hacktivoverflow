const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/encrypt')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "name can't be blank"]
    },
    img: {
        type: String
    },
    register_by: {
        type: String,
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, "email can't be blank"],
        validate: {
            isAsync: true,
            validator: function (value, cb) {
                User.findOne({
                    email: value
                }, function (err, res) {
                    cb(!res)
                })
            },
            message: "email already exist"
        }

    },
    tags: [],
    password: {
        type: String,
        minlength: [5, "minimum length is 5 caracter"],
        required: [true, "password can't be blank"]

    }
});

UserSchema.pre("save", function () {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model("User", UserSchema)
module.exports = User

