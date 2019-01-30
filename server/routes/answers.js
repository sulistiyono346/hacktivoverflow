var express = require('express');
var router = express.Router();
const AnswerController = require ('../controllers/answers')
const { isLogin ,isOwnA } = require ('../middlewares/validations')

/* GET users listing. */
router.get('/single/:id', AnswerController.get_answer)  
router.get('/:id', AnswerController.get_answers) 
router.use(isLogin)
router.post('/:id', AnswerController.add_answer)
router.put('/:id', AnswerController.update_answer) 

module.exports = router;
