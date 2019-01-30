var express = require('express');
var router = express.Router();
const QuestionsController = require ('../controllers/questions')
const { isLogin } = require ('../middlewares/validations')

/* GET users listing. */
router.get('/', QuestionsController.get_questions) 
router.use(isLogin)
router.get('/:id', QuestionsController.get_own_questions) 
router.get('/single/:id', QuestionsController.get_single_questions) 
router.post('/', QuestionsController.add_question) 
router.put('/:id', QuestionsController.update_questions) 
router.delete('/:id', QuestionsController.delete_questions) 

module.exports = router;
