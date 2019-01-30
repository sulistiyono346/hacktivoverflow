const Questions = require ('../models/question')

module.exports= {
    add_question : (req,res) => {  
        let question = {
            title: req.body.title,
            description: req.body.description,
            user: req.decoded.id,
            tags: req.body.tags
        }
        Questions.create(question)
        .then((result) => {
            res.status (200).json ({
                message: "You have been successfully post Question"
            })
        }).catch((err) => {
            res.status (400).json (err)
        });
    },
    get_questions : (req,res) => {
        Questions.find()
        .populate('user')
        .then((result) => {
            res.status (200).json (result)
        }).catch((err) => {
            res.status (200).json (err)
        });
    },
    get_own_questions : (req,res) => {
        Questions.find({user:req.decoded.id})
        .populate('user')
        .then((result) => {
            res.status (200).json (result)
        }).catch((err) => {
            res.status (200).json (err)
        });
    },
    get_single_questions : (req,res) => {
        Questions.findOne({_id:req.params.id})
        .then((result) => {
            res.status (200).json (result)
        }).catch((err) => {
            res.status (200).json (err)
        });
    },
    update_questions : (req,res) => {
        let data = {
            title: req.body.title,
            description: req.body.description,
            user: req.decoded.id,
            tags: req.body.tags
        }
        console.log(data);
        console.log(req.params.id);
        
        
        Questions.updateOne({_id:req.params.id},data)
        .then((result) => {
            res.status (200).json ({
                message: "You have been successfully update Question"
            })
        }).catch((err) => {
            res.status (200).json (err)
        });
    },
    delete_questions : (req,res) => {
        Questions.deleteOne({_id:req.params.id})
        .then((result) => {
            res.status (200).json ({
                message: "You have been successfully delete Question"
            })
        }).catch((err) => {
            res.status (200).json (err)
        });
    },
    up_vote: (req,res) => {
      Questions.findById(req.params.id)
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
            Questions.findOneAndUpdate({_id:req.params.id},{$set:{down_vote:down_vote}})
            .then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(400).json(err)
          })  
        }
        if (indexup == -1){ 
            up_vote.push(req.decoded.id)
            Questions.findOneAndUpdate({_id:req.params.id},{$set:{up_vote:up_vote}})
            .then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(400).json(err)
          })
        }
        else {
          up_vote.splice(indexup,1)
          Questions.findOneAndUpdate({_id:req.params.id},{$set:{up_vote:up_vote}})
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
      Questions.findById(req.params.id)
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
            Questions.findOneAndUpdate({_id:req.params.id},{$set:{up_vote:up_vote}})
            .then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(400).json(err)
          })  
        }     
        if (index == -1){ 
            down_vote.push(req.decoded.id)
            Questions.findOneAndUpdate({_id:req.params.id},{$set:{down_vote:down_vote}})
            .then((result) => {
              res.status(200).json(result)
            }).catch((err) => {
              res.status(400).json(err)
          })
        }
        else {
          down_vote.splice(index,1)
          Questions.findOneAndUpdate({_id:req.params.id},{$set:{down_vote:down_vote}})
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