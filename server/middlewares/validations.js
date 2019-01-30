const User = require("../models/user")
const { verify_token } = require('../helpers/token')
const Questions = require("../models/question")
const Answer = require("../models/answer")


module.exports = {
    isLogin: (req, res, next) => {
        verify_token(req.headers.token, function (err, decoded) {
            if (err) {
                res.status(400).json({
                    message: "forbidden access to this resource on the server is denied"
                })
            }
            else {
                User.findOne({ email: decoded.email })
                    .then((result) => {
                        req.decoded = {
                            id: result._id,
                            name: result.name,
                            email: result.email,
                            role: result.role,
                            img: result.img
                        }                                    
                        next()
                    }).catch((err) => {
                        res.status(400).json({
                            message: "forbidden access to this resource on the server is denied"
                        })
                    });
            }
        })
    },
    isOwnQ: (req, res, next) => {
        Questions.findById(req.params.id)
            .then((result) => {
                if (String(result.user) !== String(req.decoded.id)) {
                    req.decoded = req.decoded
                    next()
                }
                else {
                    res.status(400).json({
                        message: "you don't have permission to access / on this server"
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    },
    isOwnA: (req, res, next) => {
        Answer.findById(req.params.id)
            .then((result) => {
                console.log(result);
                
                if (String(result.user) !== String(req.decoded.id)) {
                    req.decoded = req.decoded
                    next()
                }
                else {
                    res.status(400).json({
                        message: "you don't have permission to access / on this server"
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    err
                })
            });
    }
}

