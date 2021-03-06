const Answer = require ('../models/answer')

module.exports = {
    add_answer : (req, res) => {
        let answer = {
            user : req.decoded.id,
            question_id : req.params.id,
            description : req.body.description 
        }
     Answer.create (answer)
     .then((result) => {
         res.status (200).json ({
            message: "You have been successfully post Answer"
         })
         
     }).catch((err) => {
         res.status(400).json (err)
     });
    },
    get_answers: (req,res) => {
      Answer.find({question_id:req.params.id})
      .then((result) => {
        res.status(200).json(result)
          
      }).catch((err) => {
        res.status(400).json(result)
      });
    },
    get_answer: (req,res) => {
      Answer.findOne({_id:req.params.id})
      .then((result) => {
        res.status(200).json(result)
          
      }).catch((err) => {
        res.status(400).json(result)
      });
    },
    update_answer: (req,res) => {
      let answer = {
        user : req.decoded.id,
        question_id : req.body.question_id,
        description : req.body.description 
      }
      Answer.updateOne({_id:req.params.id}, answer)
      .then((result) => {
        res.status (200).json ({
          message: "You have been successfully update Answer"
       })
      }).catch((err) => {
        res.status(400).json(result)
      });
    },
    up_vote: (req,res) => {
      Answer.findById(req.params.id)
      .then((result) => {
        var up_vote = result.up_vote
        var indexup = up_vote.findIndex(id => {
          return String(id) == String(req.decoded.id)
        }) 
        var down_vote = result.down_vote
        var indexdown = down_vote.findIndex(id => {
          return String(id) == String(req.decoded.id)
        }) 
        if (indexdown !==-1){
            down_vote.splice(indexdown ,1)
            Answer.findOneAndUpdate({_id:req.params.id},{$set:{down_vote:down_vote}})
            .then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(400).json(err)
          })  
        }
        if (indexup == -1){ 
            up_vote.push(req.decoded.id)
            Answer.findOneAndUpdate({_id:req.params.id},{$set:{up_vote:up_vote}})
            .then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(400).json(err)
          })
        }
        else {
          up_vote.splice(indexup,1)
          Answer.findOneAndUpdate({_id:req.params.id},{$set:{up_vote:up_vote}})
          .then((result) => {
            res.status(200).json(result)
          }).catch((err) => {
            res.status(400).json(err)
        })
        }
      }).catch((err) => {
        res.status(400).json(err)
      });
    },
    down_vote: (req,res) => {
      Answer.findById(req.params.id)
      .then((result) => {
        var down_vote = result.down_vote
        var index = down_vote.findIndex(id => {
          return String(id) == String(req.decoded.id)
        })
        var up_vote = result.up_vote
        var indexup = up_vote.findIndex(id => {
          return String(id) == String(req.decoded.id)
        })
        if (indexup !==-1){
            up_vote.splice(indexup ,1)
            Answer.findOneAndUpdate({_id:req.params.id},{$set:{up_vote:up_vote}})
            .then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(400).json(err)
          })  
        }     
        if (index == -1){ 
            down_vote.push(req.decoded.id)
            Answer.findOneAndUpdate({_id:req.params.id},{$set:{down_vote:down_vote}})
            .then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(400).json(err)
          })
        }
        else {
          down_vote.splice(index,1)
          Answer.findOneAndUpdate({_id:req.params.id},{$set:{down_vote:down_vote}})
          .then((result) => {
            res.status(200).json(result)
          }).catch((err) => {
            res.status(400).json(err)
        })
        }
      }).catch((err) => {
        res.status(400).json(err)
      });
    }
}