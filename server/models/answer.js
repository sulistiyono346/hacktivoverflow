const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId, ref: "User"
    },
    question_id: {
        type: Schema.Types.ObjectId, ref: "Question"
    },
    description : {
        required: [true, "title can't be blank"],
        type: String
    },
    up_vote: [{
        type: Schema.Types.ObjectId, ref: "User" 
    }],
    down_vote: [{
        type: Schema.Types.ObjectId, ref: "User" 
    }]
},{ timestamps: true })

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer