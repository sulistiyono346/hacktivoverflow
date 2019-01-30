const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId, ref: "User"
    },
    title: {
        required: [true, "title can't be blank"],
        type: String
    },
    description : {
        required: [true, "title can't be blank"],
        type: String
    },
    tags : [{type: String}],
    up_vote: [{
        type: Schema.Types.ObjectId, ref: "User" 
    }],
    down_vote: [{
        type: Schema.Types.ObjectId, ref: "User" 
    }]
},{ timestamps: true })

const Question = mongoose.model("Question", questionSchema);
module.exports = Question