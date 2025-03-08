const express = require('express')
const router = express.Router();
const boardController = require('../controllers/boardController')



router.route('/:ownerId')
.post(boardController.createBoard)


router.route('/:boardId')
    .get(boardController.getBoardId)
    .delete(boardController.deleteBoard)

// addUser
router.route('/:boardId/:userId')
.post(boardController.addUser)
module.exports = router;
