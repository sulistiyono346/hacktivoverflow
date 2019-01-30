const User = require("../models/user")
const { dcrypt } = require("../helpers/encrypt")
const { create_token } = require("../helpers/token")
const kue = require('kue')
const queue = kue.createQueue()

module.exports = {
    register: (req, res) => {
        let new_user = {
            name: req.body.name,
            email: req.body.email,
            img: "https://www.clipartmax.com/png/middle/171-1717870_stockvader-predicted-cron-for-may-user-profile-icon-png.png",
            register_by: "own_app",
            password: req.body.password
        }
        User.create(new_user)
            .then((user) => {
                queue.create('email', {
                    title: `Welcome To SULISTYO-GROUP-TECH!`,
                    email: user.email,
                    template: `<h1> Welcome ${user.email}, Thanks for Register to our website!</h1>`
                })
                    .save((err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(user);
                        }
                    })
                res.status(201).json({
                    user: user, message: "You have been successfully registered, please login first"
                })
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then((result) => {
                if (result) {
                    let dcryptPass = dcrypt(req.body.password, result.password)
                    if (dcryptPass) {
                        let data = {
                            id: result._id,
                            name: result.name,
                            email: result.email
                        }    
                        let access_token = create_token(data)
                        res.status(200).json({
                            access_token: access_token,
                            name: result.name,
                            img: result.img,
                            message: "You have been successfully login !"
                        })

                    }
                    else {
                        res.status(400).json({
                            message: "wrong password/email please try again "
                        })
                    }

                }
                else {
                    res.status(400).json({
                        message: "wrong email/email please try again "
                    })
                }

            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    get_user: (req,res) =>{
        User.findById(req.decoded.id)
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(400).json(err)
        });
    },
    isLogin: (req, res) => {
        res.status(200).json({
            message: "valid user", name: req.decoded.name, img: req.decoded.img, id:req.decoded.id
        })
    },

}