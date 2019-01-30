const User = require("../models/user")
const Question=require("../models/question")

module.exports = { 
    add_tag : (req, res) => { 
        User.findById(req.decoded.id)
        .then((result) => {
            var tags = result.tags
            tags.push(req.body.tag)  
            User.findOneAndUpdate({_id:req.decoded.id},{$set:{tags:tags}})
            .then((resulr) => {
                res.status(200).json(result)
            })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },
    remove_tag : (req, res) => { 
        User.findById(req.decoded.id)
        .then((result) => {
            console.log(result)
            var tags = result.tags
            var index = tags.findIndex(tag => {
                return String(tag) == String(req.body.tag)
              }) 
            tags.splice(index ,1)
            User.findOneAndUpdate({_id:req.decoded.id},{$set:{tags:tags}})
            .then((resulr) => {
                res.status(200).json(result)
            })
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    },
    watch_tag: (req,res) =>{
      Question.find()
        .populate('user')
        .then((result) => {
          let hasil =[]
          result.forEach(question => {
              question.tags.forEach(tag => {
                  if(tag == req.body.tag){
                    hasil.push(question) 
                  }
              })
          })
         res.status(200).json(hasil)
        })
        .catch((err) => {
            res.status(400).json(err)
        });
    }
}