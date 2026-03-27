const express = require('express');
const router = express.Router(); 
const { addComment, getComments, updateComment, deleteComment } = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .post(addComment);

router.route('/:ticketId')
    .get(getComments);

router.route('/:id')
    .put(updateComment)
    .delete(deleteComment);

module.exports = router;
