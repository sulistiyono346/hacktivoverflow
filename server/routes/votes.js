var express = require('express');
var router = express.Router();
const AnswerController = require ('../controllers/answers')
const QuestionsController = require ('../controllers/questions')
const { isLogin, isOwnQ, isOwnA } = require ('../middlewares/validations')

/* GET users listing. */
router.use(isLogin)
router.put('/question_up/:id',isOwnQ, QuestionsController.up_vote)  
router.put('/question_down/:id',isOwnQ, QuestionsController.down_vote) 
router.put('/answer_up/:id', isOwnA, AnswerController.up_vote)
router.put('/answer_down/:id', isOwnA, AnswerController.down_vote) 

module.exports = router;
